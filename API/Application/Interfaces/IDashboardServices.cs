using API.Application.DTO;
using API.Core.Entities;

namespace API.Application.Interfaces
{
    public interface IDashboardServices
    {
        public Task<List<Announcement>> GetAnnouncements(UserDto userDto);
        public Task CreateAnnouncement(Announcement announcement);
        public Task DeleteAnnouncement(Announcement announcement);
        public Task<Appointments> GetAppointments(UserDto userDto);
        public Task Create_Update_Appointments(Appointments appointment);
    }
}
