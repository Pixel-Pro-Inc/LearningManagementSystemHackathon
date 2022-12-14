using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Core.Entities
{
    public class User
    {
        public int Id { get; set; }
        //Pesonal Information
        public string Organization { get; set; }
        public string FirstNames { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string NationalIdentityNumber { get; set; }
        public string Nationality { get; set; }
        public List<string> Languages { get; set; }
        public string OrganizationId { get; set; }
        public string Email { get; set; }
        public string AvatarUrl { get; set; }
        public string AvatarPublicId { get; set; }

        //Account Information
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string AccountType { get; set; }
        public bool Disabled { get; set; } = false;

        //Hierarchy Related Information
        public string Level { get; set; }
        public DateTime ProcessionDate { get; set; }

        public string GetFullName()
        {
            return $"{FirstNames} {LastName}";
        }

        public int Age()
        {
            return (int)((float)((DateTime.Now - DateOfBirth).Days)/ 365.2425f);
        }

    }
}