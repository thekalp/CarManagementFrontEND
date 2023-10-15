using System;

namespace CarManagement.Models
{
    public class Image
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string File { get; set; }
        public DateTime? UploadDate { get; set; }
        public string Type { get; set; }
        public int? SIdref { get; set; }
    }
}
