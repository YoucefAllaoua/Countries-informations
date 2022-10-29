// declaration part

// ######################################################
// ######################################################
// ######################################################
// ######################################################
// ######################################################
let btn = document.querySelector("button");
let input = document.querySelector("input");
let errorMessage = document.querySelector(".error_message");
let info_section = document.querySelector(".country_Informations");
let options = {
	method: "Get",
};

// ######################################################
// ######################################################
// ######################################################
// ######################################################
// ######################################################

// get the content from the local storage
if (localStorage.getItem("country")) {
	info_section.innerHTML = localStorage.getItem("country");
}
// create a class which contains a method that get the data

class getData {
	async getCountry(country) {
		let finalUrl = `https://restcountries.com/v2/name/${country}?fullText=true`;
		try {
			let data = await fetch(finalUrl, options);
			return data.json();
		} catch {
			return "error";
		}
	}
}

// create an instance for the get Data class

let data = new getData();

btn.addEventListener("click", function (event) {
	event.preventDefault();
	data.getCountry(input.value.trim()).then((data) => {
		// if the data are failed
		if (data.status == 404) {
			input.classList.add("error");
			errorMessage.classList.add("shown");
			info_section.innerHTML = ``;
			// save the current country in the local storage

			localStorage.setItem("country", info_section.innerHTML);
			// if we get the data
		} else {
			// add the information ro the dom element
			info_section.innerHTML = `
                    <div class="main">

						<div class="flag">
							<img src=${data[0].flags.png} alt="" />
						</div>
						<div class="name">${data[0].name}</i></div>

					</div>
					<div class="other">

						<div class="info">
							<div class="info_title">Capital :</div>
							<div class="info_content">${data[0].capital}</div>
						</div>

						<div class="info">
							<div class="info_title">Continent :</div>
							<div class="info_content">${data[0].region}</div>
						</div>

						<div class="info">
							<div class="info_title">Population :</div>
							<div class="info_content">${data[0].population}</div>
						</div>
                        
						<div class="info">
							<div class="info_title">Currency :</div>
							<div class="info_content">${data[0].currencies[0].name}</div>
						</div>
                        
						<div class="info">
							<div class="info_title">Cummon Language :</div>
							<div class="info_content">${data[0].languages[0].name}</div>
						</div>
					</div>`;

			// remove the error in case they are added
			input.classList.remove("error");
			errorMessage.classList.remove("shown");

			// save the current country in the local storage

			localStorage.setItem("country", info_section.innerHTML);
		}
	});
});
