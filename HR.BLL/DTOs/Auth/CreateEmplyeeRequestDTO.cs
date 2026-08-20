using System.ComponentModel.DataAnnotations;

namespace HR.BLL.DTOs.Auth
{
    public class CreateEmplyeeRequestDTO
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

        [Required(ErrorMessage = "Country can't be blank")]
        public string Country { get; set; } = string.Empty;
    }
}
