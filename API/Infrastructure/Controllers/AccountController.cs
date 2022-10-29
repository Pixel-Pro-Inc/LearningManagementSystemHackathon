using API.Application.DTO;
using API.Application.Interfaces;
using API.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace API.Infrastructure.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly IAccountService _accountService;
        public AccountController(ITokenService tokenService, IAccountService accountService)
        {
            _tokenService = tokenService;
            _accountService = accountService;
        }
        [HttpPost("signup")]
        public async Task<ActionResult<UserDto>> SignUp(SignUpDto signUpDto)
        {
            using var hmac = new HMACSHA512();

            if (await _accountService.GetUser(signUpDto.Email) != null)
            {
                return BadRequest("You already have an account");
            }

            User appUser = new User()
            {
                FirstNames = signUpDto.FirstNames,
                LastName = signUpDto.LastName,
                Email = signUpDto.Email,
                OrganizationId = signUpDto.StudentId,
                AccountType = signUpDto.AccountType,
                DateOfBirth = signUpDto.DateOfBirth,
                Languages = signUpDto.Languages,
                NationalIdentityNumber = signUpDto.NationalIdentityNumber,
                Nationality = signUpDto.Nationality,
                Organization = signUpDto.Organization,
                PasswordSalt = hmac.Key,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(signUpDto.Password))
            };

            await _firebaseService.StoreData<User>("Account", appUser);

            return new UserDto() {
                StudentId = appUser.OrganizationId,
                Email = appUser.Email,
                AccountType = appUser.AccountType,
                Disabled = appUser.Disabled,
                FirstNames = appUser.FirstNames,
                Languages = appUser.Languages,
                LastName = appUser.LastName,
                Organization = appUser.Organization,
                Token= _tokenService.CreateToken(appUser),
            };
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            //Checks if the account exists
            User appUser = await _accountService.GetUser(loginDto.AccountId);

            if (appUser == null)
                return BadRequest("This account does not exist");

            using var hmac = new HMACSHA512(appUser.PasswordSalt);
            Byte[] computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != appUser.PasswordHash[i])
                    return Unauthorized("Wrong password");
            }

            return new UserDto()
            {
                Email = appUser.Email,
                StudentId = appUser.OrganizationId,
                AccountType = appUser.AccountType,
                Disabled = appUser.Disabled,
                FirstNames = appUser.FirstNames,
                Languages = appUser.Languages,
                LastName = appUser.LastName,
                Organization = appUser.Organization,
                Token = _tokenService.CreateToken(appUser),
            };
        }
        [Authorize]
        [HttpGet("users")]
        public async Task<ActionResult<List<UserDto>>> GetAccounts()
        {
            List<UserDto> userDtos = new List<UserDto>();

            List<User> users = await _firebaseService.GetData<User>("Account");

            foreach (var appUser in users)
            {
                userDtos.Add(new UserDto()
                {
                    Email = appUser.Email,
                    StudentId = appUser.OrganizationId,
                    AccountType = appUser.AccountType,
                    Disabled = appUser.Disabled,
                    FirstNames = appUser.FirstNames,
                    Languages = appUser.Languages,
                    LastName = appUser.LastName,
                    Organization = appUser.Organization
                });
            }

            return userDtos;
        }
    }
}