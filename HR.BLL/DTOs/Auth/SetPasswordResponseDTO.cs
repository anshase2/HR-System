namespace HR.BLL.DTOs.Auth
{
    public class SetPasswordResponseDTO
    {
        public bool Succeeded { get; set; }
        public bool UserNotFound { get; set; }
        public string Message { get; set; } = string.Empty;
        public List<string>? Errors { get; set; }
    }
}
