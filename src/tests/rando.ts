
const popularURls = ["youtube.com", "en.wikipedia.org", "twitter.com", "instagram.com", "amazon.com", "pinterest.com", "imdb.com", "es.wikipedia.org", "facebook.com", "fandom.com", "apple.com", "ja.wikipedia.org", "de.wikipedia.org", "live.com", "cricbuzz.com", "fr.wikipedia.org", "linkedin.com", "globo.com", "microsoft.com", "nytimes.com", "etsy.com", "it.wikipedia.org", "mayoclinic.org", "healthline.com", "indiatimes.com", "amazon.in", "amazon.de", "bbc.co.uk", "ikea.com", "amazon.co.jp", "amazon.co.uk", "indeed.com", "flipkart.com", "bbc.com", "espn.com", "mail.yahoo.com", "ebay.com", "hurriyet.com.tr", "allegro.pl", "booking.com", "mercadolivre.com.br", "britannica.com", "google.com", "kompas.com", "nih.gov", "cnn.com", "merriam-webster.com", "homedepot.com", "amazon.fr", "ar.wikipedia.org", "detik.com", "nike.com", "medlineplus.gov", "id.wikipedia.org", "brainly.co.id", "milliyet.com.tr", "accuweather.com", "magazineluiza.com.br", "marca.com", "medicalnewstoday.com", "cdc.gov", "hepsiburada.com", "cambridge.org", "cookpad.com", "m.wikipedia.org", "dailymail.co.uk", "as.com", "ilovepdf.com", "gsmarena.com", "byjus.com", "amazon.it", "adobe.com", "investing.com", "epfindia.gov.in", "clevelandclinic.org", "aliexpress.com", "espncricinfo.com", "india.com", "ndtv.com", "canva.com", "amazon.es", "craigslist.org", "finance.yahoo.com", "dailymotion.com", "indiamart.com", "kinopoisk.ru", "nl.wikipedia.org", "onet.pl", "omegle.com", "goal.com", "americanas.com.br", "investopedia.com", "dictionary.com", "mail.ru", "ebay.co.uk", "naver.com", "hm.com", "hotstar.com", "bestbuy.com", "collinsdictionary.com"]

function getUrl() {
    let rando = Math.floor(Math.random() * popularURls.length)
    return popularURls[rando]
}

function getMaybeUrl() {
    let rando = Math.random()
    if(rando > 0.5) {
        return getUrl()
    } else {
        return undefined
    }
}

function getBool() {
    let rando = Math.random()
    return rando > 0.5
}


export const rando = {
    maybeUrl: getMaybeUrl,
    bool: getBool
}