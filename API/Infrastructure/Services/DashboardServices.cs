using API.Application.DTO;
using API.Application.Interfaces;
using API.Core.Entities;

namespace API.Infrastructure.Services
{
    public class DashboardServices: IDashboardServices
    {
        private readonly IFirebaseService _firebaseService;
        public DashboardServices(IFirebaseService firebaseService)
        {
            _firebaseService = firebaseService;
        }

        public async Task CreateAnnouncement(Announcement announcement)
        {
            await _firebaseService.StoreData<Announcement>("Announcement", announcement);
        }

        public async Task DeleteAnnouncement(Announcement announcement)
        {
            await _firebaseService.DeleteData("Announcement/" + announcement.Id);
        }

        public async Task<List<Announcement>> GetAnnouncements(UserDto userDto)
        {
            var announcements = await _firebaseService.GetData<Announcement>("Announcement");

            return announcements.Where(a => a.Audience.Contains(userDto.AccountType)).ToList();
        }

        public async Task<Appointments> GetAppointments(UserDto userDto)
        {
            var appointments = await _firebaseService.GetData<Appointments>("Appointment");

            Appointments myAppointments = null;

            if(appointments.Count > 0)
            {
                var result = appointments.Where(a => a.OwnerId == userDto.OrganizationId).ToList();

                if (result.Count > 0)
                    myAppointments = result[0];
            }

            return myAppointments;
        }

        public async Task Create_Update_Appointments(Appointments appointment)
        {
            var appointments = await _firebaseService.GetData<Appointments>("Appointment");

            var myAppointments = appointments.Where(a => a.OwnerId == appointment.OwnerId).ToList();

            if(myAppointments.Count > 0)
            {
                appointment.Id = myAppointments[0].Id;

                await _firebaseService.EditData("Appointment/" + myAppointments[0].Id, appointment);
                return;
            }

            await _firebaseService.StoreData<Appointments>("Appointment", appointment);
        }
    }
}
