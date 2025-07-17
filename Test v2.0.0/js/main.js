function toggleMenu() {
  const nav = document.querySelector('.navbar-collapse');
  nav.classList.toggle('show');
}


 // SEAT SELECTION FUNCTIONS
        let selectedMovie = '';
        let selectedSeats = [];
        
        function openSeatSelection(movieTitle) {
            selectedMovie = movieTitle;
            document.getElementById('modalMovieTitle').textContent = movieTitle;
            document.getElementById('seatModal').style.display = 'block';
            generateSeats();
        }
        
        function closeModal() {
            document.getElementById('seatModal').style.display = 'none';
            selectedSeats = [];
        }
        
        function generateSeats() {
            const container = document.getElementById('seatsContainer');
            container.innerHTML = '';
            
            // Create 80 seats (8 rows x 10 seats)
            for (let i = 0; i < 80; i++) {
                const seat = document.createElement('div');
                seat.className = 'seat';
                
                // Randomly mark some seats as occupied (for demo)
                if (Math.random() < 0.2) {
                    seat.classList.add('occupied');
                }
                
                seat.textContent = `${Math.floor(i/10)+1}${String.fromCharCode(65 + (i%10))}`;
                seat.onclick = function() {
                    toggleSeatSelection(this);
                };
                
                container.appendChild(seat);
            }
        }
        
        function toggleSeatSelection(seat) {
            if (seat.classList.contains('occupied')) return;
            
            seat.classList.toggle('selected');
            const seatNumber = seat.textContent;
            
            if (seat.classList.contains('selected')) {
                selectedSeats.push(seatNumber);
            } else {
                selectedSeats = selectedSeats.filter(s => s !== seatNumber);
            }
        }
        
        function confirmBooking() {
            if (selectedSeats.length === 0) {
                alert('Please select at least one seat');
                return;
            }
            
            document.getElementById('confirmed-movie').textContent = 
                `${selectedMovie} (Seats: ${selectedSeats.join(', ')})`;
            
            closeModal();
            document.getElementById('thank-you').style.display = 'block';
            document.getElementById('thank-you').scrollIntoView({ behavior: 'smooth' });
            
            // Reset after 5 seconds
            setTimeout(() => {
                document.getElementById('thank-you').style.display = 'none';
                selectedSeats = [];
            }, 5000);
        }