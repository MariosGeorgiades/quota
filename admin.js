document.addEventListener("DOMContentLoaded", function () {
    const greekQuotes = JSON.parse(localStorage.getItem("greekQuotes")) || [];
    const englishQuotes = JSON.parse(localStorage.getItem("englishQuotes")) || [];
    let language = "greek";

    const saveQuotesToStorage = () => {
        localStorage.setItem("greekQuotes", JSON.stringify(greekQuotes));
        localStorage.setItem("englishQuotes", JSON.stringify(englishQuotes));
    };

    const updateQuoteList = () => {
        const quoteList = document.getElementById("quoteList");
        quoteList.innerHTML = "";
        (language === "english" ? englishQuotes : greekQuotes).forEach((quote, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${quote}`;
            quoteList.appendChild(listItem);
        });
    };

    const updateQuoteDropdown = () => {
        const dropdown = document.getElementById("removeQuoteDropdown");
        dropdown.innerHTML = "";
        (language === "english" ? englishQuotes : greekQuotes).forEach((quote, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = quote;
            dropdown.appendChild(option);
        });
    };

    document.getElementById("addQuoteButton").addEventListener("click", function () {
        const newQuote = document.getElementById("newQuoteText").value.trim();
        if (newQuote) {
            (language === "english" ? englishQuotes : greekQuotes).push(newQuote);
            saveQuotesToStorage();
            updateQuoteList();
            updateQuoteDropdown();
            alert("Quote added successfully!");
        } else {
            alert("Please enter a valid quote.");
        }
    });

    document.getElementById("removeQuoteButton").addEventListener("click", function () {
        const dropdown = document.getElementById("removeQuoteDropdown");
        const selectedIndex = dropdown.value;
        if (selectedIndex !== null) {
            (language === "english" ? englishQuotes : greekQuotes).splice(selectedIndex, 1);
            saveQuotesToStorage();
            updateQuoteList();
            updateQuoteDropdown();
            alert("Quote removed successfully!");
        }
    });

    document.getElementById("goBackButton").addEventListener("click", function () {
        window.close();
    });

    updateQuoteList();
    updateQuoteDropdown();
});
