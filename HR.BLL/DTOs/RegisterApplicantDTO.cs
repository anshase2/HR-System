using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.BLL.DTOs
{
    public class RegisterApplicantDTO
    {
        [Required(ErrorMessage = "First Name can't be blank")]
        public string FirstName { get; set; } = string.Empty;
        [Required(ErrorMessage = "Last Name can't be blank")]

        public string LastName { get; set; } = string.Empty;


        [Required(ErrorMessage = "Email can't be blank")]
        [EmailAddress(ErrorMessage = "Email should be in a proper email address format")]
        // [Remote(action: "IsEmailAlreadyRegistered", controller: "Account", ErrorMessage = "Email is already is use")]
        public string Email { get; set; } = string.Empty;


        [Required(ErrorMessage = "Phone number can't be blank")]
        [RegularExpression("^[0-9]*$", ErrorMessage = "Phone number should contain digits only")]
        // [Remote(action: "IsEmailAlreadyRegister", controller: "Account", ErrorMessage = "Email is already is use")] //soon
        public string PhoneNumber { get; set; } = string.Empty;


        [Required(ErrorMessage = "Password can't be blank")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "Country can't be blank")]
        public string Country { get; set; } = string.Empty;
      
        [Required(ErrorMessage = "Confirm Password can't be blank")]
        [Compare("Password", ErrorMessage = "Password and confirm password do not match")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
