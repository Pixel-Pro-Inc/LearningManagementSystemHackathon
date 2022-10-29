using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.DTO
{
    public class SignUpDto
    {
        public string Organization { get; set; }
        public string FirstNames { get; set; }
        public string LastName { get; set; }
        public string StudentId { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string NationalIdentityNumber { get; set; }
        public string Nationality { get; set; }
        public List<string> Languages { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string AccountType { get; set; }
    }
}
