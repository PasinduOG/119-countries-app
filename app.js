function searchCountry() {
    let name = document.getElementById("search").value;

    if (!name.trim()) {
        document.getElementById("card").classList.add("hidden");
        return;
    }

    try {
        fetch(`https://restcountries.com/v3.1/name/${name}`)
            .then(res => res.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    document.getElementById("card").classList.remove("hidden");

                    const country = data[i];
                    const currencyKey = Object.keys(country.currencies)[0];
                    const currencySymbol = country.currencies[currencyKey].symbol;

                    const nativeKey = Object.keys(country.name.nativeName)[0];
                    const nativeSymbol = country.name.nativeName[nativeKey].common;

                    document.getElementById("countryName").innerText = country.name.common;
                    document.getElementById("nativeName").innerText = nativeSymbol;
                    document.getElementById("flag-div").innerHTML = `<img class="card-img-top object-fit-cover" src="${country.flags.png}" alt="Country flag" loading="lazy">`;
                    document.getElementById("countryCapital").innerText = country.capital;
                    document.getElementById("countryRegion").innerText = country.region;
                    document.getElementById("countrySubregion").innerText = country.subregion;
                    document.getElementById("population").innerText = country.population;
                    document.getElementById("area").innerText = country.area;
                    document.getElementById("currency").innerText = currencySymbol;

                    const languageKeys = Object.keys(country.languages);
                    const languagePairs = [];

                    for (let i = 0; i < languageKeys.length; i++) {
                        const key = languageKeys[i];
                        const name = country.languages[key];
                        languagePairs.push(`${name}`);
                    }

                    if (document.getElementById("languages")) {
                        document.getElementById("languages").innerText = languagePairs.join(', ');
                    }

                    document.getElementById("timezones").innerText = country.timezones;
                    document.getElementById("independent").innerText = country.independent;
                    document.getElementById("tld").innerText = country.cca2;

                    const lat = country.latlng[0];
                    const lng = country.latlng[1];
                    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng-5},${lat-5},${lng+5},${lat+5}&layer=mapnik&marker=${lat},${lng}`;
                    document.getElementById("mapData").innerHTML = `<iframe width="100%" height="100%" frameborder="0" style="border-radius: 12px;" src="${mapUrl}"></iframe>`;
                }

            });
    } catch {
        document.getElementById("card").classList.add("hidden");
    }
}