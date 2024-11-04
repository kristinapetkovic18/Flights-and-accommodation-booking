﻿using Microsoft.AspNetCore.Mvc;
using ReservationService.Core;
using ReservationService.Model.DTO;
using ReservationService.Model;
using Grpc.Net.Client;
using ReservationService.Core;
using Proto2;
using Grpc.Core;
namespace ReservationService.Services
{
    public class ReservationService : IReservationService
    {
        public Reservation CreateReservation(ReservationDTO? dto)
        {
            try
            {
                using UnitOfWork unitOfWork = new(new ApplicationContext());

                var reservation = new Reservation();
                if (dto != null)
                {
                    reservation.AccommodationId = dto.AccommodationId;
                    reservation.StartDate = dto.StartDate;
                    reservation.EndDate = dto.EndDate;
                    reservation.GuestId = dto.GuestId;
                    reservation.NumGuests = dto.NumGuests;
                    reservation.Accepted = unitOfWork.Accommodations.Get(dto.AccommodationId).AutoAcceptReservations;
                    reservation.TotalPrice = TotalPrice(dto.AccommodationId,dto.StartDate ,  dto.EndDate, dto.NumGuests);
                }

                unitOfWork.Reservations.Add(reservation);
                unitOfWork.Complete();
                return reservation;
            }
            catch (Exception e)
            {
                return null!;
            }
        }

        public double TotalPrice(long accommodationId, DateTime startDate, DateTime endDate, int numGuests)
        {
            using UnitOfWork unitOfWork = new(new ApplicationContext());
            var accommodation = unitOfWork.Accommodations.Get(accommodationId);
            if (accommodation.PriceForOneGuest)
            { 
                return accommodation.Price * (endDate - startDate).TotalDays * numGuests;
            }
            return  accommodation.Price * (endDate - startDate).TotalDays;
        }

        private void DeleteReservationsWithMatchingPeriod(Reservation reservation)
        {
            using UnitOfWork unitOfWork = new(new ApplicationContext());
            var reservations = unitOfWork.Reservations.GetAll().Where(f => f.Id != reservation.Id);
            foreach (var matchingReservation in reservations)
            {
                if (MatchedAccommodation(matchingReservation, reservation) &&
                    MatchedPeriods(matchingReservation, reservation))
                {
                    DeletePendingReservation(matchingReservation.Id);
                }
            }
        }

        private void DeletePendingReservation(long id)
        {
            using UnitOfWork unitOfWork = new(new ApplicationContext());
            var reservation = unitOfWork.Reservations.Get(id);
            if (reservation.Deleted == false && reservation.Accepted == false)
            {
                reservation.Deleted = true;
                UpdateReservation(reservation);
            }
        }

        public bool CancelReservationByGuest(Reservation reservation)
        {
            using UnitOfWork unitOfWork = new(new ApplicationContext());
            if (!CantBeCancled(reservation))
            {
                reservation.Deleted = true;
                UpdateReservation(reservation);
                 new UserService().GetUserById(reservation.GuestId);
                return true;
            }

            return false;
        }

        private static bool CantBeCancled(Reservation reservation)
        {
            var dif = reservation.StartDate.Date -  DateTime.Now ;
            return dif.TotalDays < 1;
        }

        private static bool MatchedAccommodation(Reservation matchingReservation, Reservation reservation)
        {
            return matchingReservation.AccommodationId == reservation.AccommodationId;
        }

       public object? GetAll()
        {
            using UnitOfWork unitOfWork = new(new ApplicationContext());
            return unitOfWork.Reservations.GetAll();
        }

        public ActionResult<Reservation> GetById(long id)
        {
            using UnitOfWork unitOfWork = new(new ApplicationContext());
            return unitOfWork.Reservations.Get(id);
        }

        private Reservation UpdateReservation(Reservation dto)
        {
            try
            {
                using UnitOfWork unitOfWork = new(new ApplicationContext());

                unitOfWork.Reservations.Update(dto);
                unitOfWork.Complete();

                return dto;
            }
            catch (Exception e)
            {
                return null!;
            }
        }

        public void AcceptReservation(Reservation reservation)
        {
            using UnitOfWork unitOfWork = new(new ApplicationContext());
            reservation.Accepted = true;
            UpdateReservation(reservation);
            DeleteReservationsWithMatchingPeriod(reservation);
        }

        public object? GetByHostId(long id)
        {
            using UnitOfWork unitOfWork = new(new ApplicationContext());

            return (from reservation in unitOfWork.Reservations.GetAll()
                let accommodation = unitOfWork.Accommodations.Get(reservation.AccommodationId)
                where accommodation.HostId == id
                select reservation).ToList();
        }

        public object? GetByAccommodationId(long id)
        {
            using UnitOfWork unitOfWork = new(new ApplicationContext());
            return unitOfWork.Reservations.GetAll().Where(reservation => reservation.AccommodationId == id).ToList();
        }
        private static bool MatchedPeriods(Reservation match, Reservation reservation)
        {
            //poklapaju se ili spada unutar ; poklapaju se ili preklapa ceo period ; pocinje ranije ali se preklapa
            if (match.StartDate >= reservation.StartDate &&
                match.EndDate <= reservation.EndDate ||
                reservation.StartDate >= match.StartDate &&
                reservation.EndDate <= match.EndDate ||
                match.StartDate <= reservation.StartDate &&
                reservation.StartDate <= match.EndDate)
            {
                return true;
            }

            //pocinje kasnije ali se preklapa
            return match.StartDate >= reservation.StartDate &&
                   reservation.StartDate <= match.EndDate;
        }

        public object? GetByGuestId(long id)
        {
            using UnitOfWork unitOfWork = new(new ApplicationContext());
            return unitOfWork.Reservations.GetAll().Where(reservation => reservation.GuestId == id).ToList();

        }

        public object? IsAccommodationAvailable(long id)
        {
            var allAcceptedForAccommodation = AllAcceptedForAccommodation(id);
            var nonAvailableDates = NonAvailableDates(allAcceptedForAccommodation);
            return nonAvailableDates;
        }

        
        private static List<Reservation> AllAcceptedForAccommodation(long id)
        {
            using UnitOfWork unitOfWork = new(new ApplicationContext());
            return unitOfWork.Reservations.GetAll().Where(reservation => reservation.AccommodationId == id && reservation.Accepted).ToList();
        }

        private static IEnumerable<DateTime> NonAvailableDates(List<Reservation> allAcceptedReservations)
        {
            var nonAvailableDates = new List<DateTime>();
            foreach (var reservation in allAcceptedReservations)
            {
                var dateTime = reservation.StartDate;
                var daysInBetween = (reservation.EndDate - reservation.StartDate).Days;

                for(var i =0; i <= daysInBetween; i++)

                {
                    nonAvailableDates.Add(dateTime.AddDays(i));
                }
            }
            return nonAvailableDates;
        }
        public bool CheckIfAccommodationCanBeReserved(long accommodationID, DateTime startDate, DateTime endDate)
        {
            using UnitOfWork unitOfWork = new(new ApplicationContext());

            DateTime today = DateTime.Today;

            IEnumerable<Reservation> reservations =
                unitOfWork.Reservations.GetAllReservationsForAccommodation(accommodationID, today);

            foreach (Reservation res in reservations)
            {
                if (startDate <= res.StartDate && endDate >= res.StartDate)
                {
                    return false;
                }
                if (startDate >= res.StartDate && startDate <= res.EndDate)
                {
                    return false;
                }
                
                if (startDate <= res.StartDate && endDate >= res.EndDate)
                {
                    return false;
                }
                if (startDate >= res.StartDate && endDate <= res.EndDate)
                {
                    return false;
                }


            }

            return true;

        }
        
        public bool GuestHasReservations(long guestId)
        { 
            using UnitOfWork unitOfWork = new(new ApplicationContext());
            return unitOfWork.Reservations.GetAll().Where(reservation => reservation.GuestId == guestId).ToList().Any();
        }
        
        public bool HostHasActiveReservations(long hostId)
        {
            using UnitOfWork unitOfWork = new(new ApplicationContext()); 
            var acceptedReservations = unitOfWork.Reservations.GetAll().Where(reservation => reservation.Accepted).ToList();
            var hostAccommodations = unitOfWork.Accommodations.GetAll().Where(accommodation => accommodation.HostId==hostId).ToList();
            var acceptedReservationsForHost = GetReservationsForAccommodations(hostAccommodations, acceptedReservations);
            var today = DateTime.Today;
           return acceptedReservationsForHost.Any(r => r.StartDate >= today);
        }

        private IEnumerable<Reservation> GetReservationsForAccommodations(List<Accommodation> accommodations, List<Reservation> reservations)
        {
            var matchingReservations = new List<Reservation>();
            foreach (var accommodation in accommodations)
            {
                var reservationsForAccommodation = reservations.Where(r => r.AccommodationId == accommodation.Id).ToList();
                matchingReservations.AddRange(reservationsForAccommodation);
            }
    
            return matchingReservations;
        }
    }
}
