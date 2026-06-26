// ============================================================================
//  seats.js — seat selection (R3): live "N / 6" counter, max 6, total, enables Continue
//  Seats are checkboxes (name="seats"); the styled <label> is the clickable seat.
// ============================================================================
const PRICE_PER_SEAT = 12;     // £ per ticket
const MAX_SEATS = 6;

const checkboxes  = document.querySelectorAll('.seat-row input[type="checkbox"]');
const countEl     = document.getElementById('seatCount');
const totalEl     = document.getElementById('seatTotal');
const totalField  = document.getElementById('totalField');
const continueBtn = document.getElementById('continueBtn');

function money(n) { return '£' + n.toFixed(2); }

function update() {
  const count = document.querySelectorAll('.seat-row input[type="checkbox"]:checked').length;
  const total = count * PRICE_PER_SEAT;
  countEl.textContent = count + ' / ' + MAX_SEATS;
  totalEl.textContent = money(total);
  totalField.value = money(total);
  continueBtn.disabled = count === 0;                 // can't continue with 0 seats
  countEl.classList.toggle('limit', count >= MAX_SEATS);
}

checkboxes.forEach(function (box) {
  box.addEventListener('change', function () {
    const count = document.querySelectorAll('.seat-row input[type="checkbox"]:checked').length;
    if (count > MAX_SEATS) {                            // block the 7th seat, flash the counter
      box.checked = false;
      countEl.classList.add('limit');
      setTimeout(function () { countEl.classList.remove('limit'); }, 350);
      return;
    }
    update();
  });
});

update();   // initial state on load