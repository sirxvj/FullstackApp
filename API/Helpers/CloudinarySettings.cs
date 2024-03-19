using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class CloudinarySettings
    {
        public string CloudName { get; set; }=null!;
        public string APIKey { get; set; }=null!;
        public string APISecret { get; set; }=null!;
        public string EnvUrl { get; set; }=null!;
    }
}