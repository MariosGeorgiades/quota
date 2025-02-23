document.addEventListener("DOMContentLoaded", () => {
    const isAdmin = document.cookie.includes("uwuev$#!VF$Vkdsigiroids");
    const loginBtn = document.getElementById("loginBtn");
    if (isAdmin) {
      loginBtn.innerHTML = "Go to Admin";
      return loginBtn.onclick = () => window.location.href = "/admin";
    }
});
document.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("submitLogin").click(); 
    }
});



$(document).ready(function () {

    document.getElementById("loginBtn").addEventListener("click", () => {
            // Update button text and behavior
        console.log('Login')
        let popup = document.createElement("div");
        popup.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                        background: white; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.3);">
                <h3>Login</h3>
                <input type="password" id="passwordInput" placeholder="Enter password" style="display: block; margin-bottom: 10px;">
                <button id="submitLogin">Submit</button>
                <button id="closePopup">Cancel</button>
            </div>
        `;
    
        document.body.appendChild(popup);
    
        // Close popup
        document.getElementById("closePopup").addEventListener("click", () => popup.remove());
    
        // Handle login request
        document.getElementById("submitLogin").addEventListener("click", async () => {
            let password = document.getElementById("passwordInput").value;
    
            let response = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password })
            });
    
            let result = await response.json();
    
            if (result.success) {
                document.cookie = `auth_token=${result.token}; path=/; max-age=3600;`;
                window.location.href = "/admin"
                // alert("Login successful!");

                popup.remove();
            } else {
                alert("Incorrect password!");
            }
        });
    });
    
    const quotes = [
        "Η δύναμη στην ζωή δεν έρχεται από τι μπορείς να κάνεις τώρα αλλά έρχεται από να κάνεις τα πράγματα που πίστευες ότι δεν θα μπορούσες.",
        "Αυτός που δεν είναι ευχαριστημένος με αυτό που έχει δεν θα είναι ευχαριστημένος με αυτό που θα ήθελε να έχει — Σωκράτης",
        "Η ζωή είναι μια βόλτα απόλαυσε την γιατί δεν υπάρχει εισιτήριο επιστροφής",
        "Πρέπει καθημερινά να μην είσαι σκλάβος του εαυτού σου πρέπει να ξεπερνάς τα όρια σου",
        "Όλα ξεκινούν και τελειώνουν στο μυαλό σου. Σε ότι δίνεις δύναμη αυτό σε εξουσιάζει.", 
        " Πίστεψε στον εαυτό σου και όλα είναι δυνατά.",
        "Η ζωή είναι σαν την ποδηλασία, για να διατηρηθείς ισορροπημένος πρέπει να κινείσαι.",
        "Το μυστικό της επιτυχίας είναι να ξεκινήσεις.",
        "Μην σταματάς ποτέ να προσπαθείς για το καλύτερο.",
        "Τα όνειρα δεν δουλεύουν, αν δεν δουλεύεις κι εσύ.",
        "Η κάθε μέρα είναι μια καινούργια ευκαιρία.",
        "Δεν είναι ποτέ αργά να γίνεις αυτό που θα μπορούσες να είσαι.",
        "Τα εμπόδια είναι η αρχή κάθε επιτυχίας.",
        "Μην φοβάσαι να αποτύχεις, φόβησου να μην προσπαθήσεις.",
        "Το θάρρος είναι το πρώτο βήμα προς την επιτυχία.",
        "Μάθε να σηκώνεσαι όταν πέφτεις",
        "Όσο πιο σκληρά δουλεύεις, τόσο πιο τυχερός γίνεσαι.",
        "Η πίστη σου καθορίζει τη δύναμή σου.",
        " Ο φόβος είναι μόνο μια κατάσταση του νου.",
        "Το μέλλον ανήκει σε εκείνους που το δημιουργούν.",
    ];

    const dailyTips = [
        "Ξεκίνα την ημέρα σου με ευγνωμοσύνη.",
        "Δώσε προτεραιότητα στην υγεία σου.",
        "Οργάνωσε την ημέρα σου με μια λίστα προτεραιοτήτων.",
        "Μάθε κάτι νέο κάθε μέρα για να διευρύνεις τις γνώσεις σου.",
        "Αφιέρωσε χρόνο για να κάνεις κάτι που σε ευχαριστεί και σε αναζωογονεί."
    ];

    let quoteIndex = 0;

    // function showQuote() {
    //     $('#quoteText').css('opacity', 0).css('transform', 'scale(0.9)');
    //     setTimeout(() => {
    //         $('#quoteText')
    //             .text(quotes[quoteIndex])
    //             .css('opacity', 1)
    //             .css('transform', 'scale(1)');
    //         quoteIndex = (quoteIndex + 1) % quotes.length;
    //     }, 400);
    //     $('#audioPlayer')[0].play();
    // }

    function getDailyTip() {
        const today = new Date();
        const tipIndex = today.getDate() % dailyTips.length;
        return dailyTips[tipIndex];
    }

    function displayDailyContent() {
        const today = new Date();
        const dailyQuoteIndex = today.getDate() % quotes.length;
        const dailyQuote = quotes[dailyQuoteIndex];
        $('.daily-quotes-container').html(`
            <h1>Daily Quote</h1>
            <div class="quote-post">
                <p>“${dailyQuote}”</p>
            </div>
            <h2>Tip of the Day</h2>
            <div class="quote-post">
                <p>${getDailyTip()}</p>
            </div>
        `);
    }

    $('#showQuoteButton').click(showQuote);

    $('#homeButton').click(function () {
        $('.content').removeClass('active');
        $('.home-content').addClass('active');
    });

    $('#dailyQuotesButton').click(function () {
        $('.content').removeClass('active');
        $('.daily-quotes-content').addClass('active');
        displayDailyContent();
    });

    $('#homeButton').click(); // Initialize to home view
});
