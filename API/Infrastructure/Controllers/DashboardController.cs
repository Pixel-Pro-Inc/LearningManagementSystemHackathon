using API.Application.DTO;
using API.Application.Interfaces;
using API.Core.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Infrastructure.Controllers
{
    public class DashboardController : BaseApiController
    {
        private readonly IDashboardServices _dashboardServices;
        public DashboardController(IDashboardServices dashboardServices)
        {
            _dashboardServices = dashboardServices;
        }
        #region Announcement
        [HttpPost("announcement/retrieve")]
        public async Task<ActionResult<List<Announcement>>> GetAnnouncements(UserDto userDto)
        {
            return await _dashboardServices.GetAnnouncements(userDto);
        }
        [HttpPost("announcement/create")]
        public async Task CreateAnnouncement(Announcement announcement)
        {
            await _dashboardServices.CreateAnnouncement(announcement);
        }
        [HttpPost("announcement/delete")]
        public async Task DeleteAnnouncement(Announcement announcement)
        {
            await _dashboardServices.DeleteAnnouncement(announcement);
        }
        #endregion

        #region Appointments
        [HttpPost("appointment/retrieve")]
        public async Task<ActionResult<Appointments>> GetAppointments(UserDto userDto)
        {
            return await _dashboardServices.GetAppointments(userDto);
        }

        [HttpPost("appointment/create_update")]
        public async Task Create_Update_Appointments(Appointments appointment)
        {
            await _dashboardServices.Create_Update_Appointments(appointment);
        }
        #endregion

    }
}
