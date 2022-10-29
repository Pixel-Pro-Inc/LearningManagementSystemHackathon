using API.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Infrastructure.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : Controller
    {
        protected readonly IFirebaseService _firebaseService;
        public BaseApiController(IFirebaseService firebaseService = null)
        {
            _firebaseService = firebaseService; 
        }
    }
}
