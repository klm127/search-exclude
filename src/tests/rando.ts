
const popularURls = ["youtube.com", "en.wikipedia.org", "twitter.com", "instagram.com", "amazon.com", "pinterest.com", "imdb.com", "es.wikipedia.org", "facebook.com", "fandom.com", "apple.com", "ja.wikipedia.org", "de.wikipedia.org", "live.com", "cricbuzz.com", "fr.wikipedia.org", "linkedin.com", "globo.com", "microsoft.com", "nytimes.com", "etsy.com", "it.wikipedia.org", "mayoclinic.org", "healthline.com", "indiatimes.com", "amazon.in", "amazon.de", "bbc.co.uk", "ikea.com", "amazon.co.jp", "amazon.co.uk", "indeed.com", "flipkart.com", "bbc.com", "espn.com", "mail.yahoo.com", "ebay.com", "hurriyet.com.tr", "allegro.pl", "booking.com", "mercadolivre.com.br", "britannica.com", "google.com", "kompas.com", "nih.gov", "cnn.com", "merriam-webster.com", "homedepot.com", "amazon.fr", "ar.wikipedia.org", "detik.com", "nike.com", "medlineplus.gov", "id.wikipedia.org", "brainly.co.id", "milliyet.com.tr", "accuweather.com", "magazineluiza.com.br", "marca.com", "medicalnewstoday.com", "cdc.gov", "hepsiburada.com", "cambridge.org", "cookpad.com", "m.wikipedia.org", "dailymail.co.uk", "as.com", "ilovepdf.com", "gsmarena.com", "byjus.com", "amazon.it", "adobe.com", "investing.com", "epfindia.gov.in", "clevelandclinic.org", "aliexpress.com", "espncricinfo.com", "india.com", "ndtv.com", "canva.com", "amazon.es", "craigslist.org", "finance.yahoo.com", "dailymotion.com", "indiamart.com", "kinopoisk.ru", "nl.wikipedia.org", "onet.pl", "omegle.com", "goal.com", "americanas.com.br", "investopedia.com", "dictionary.com", "mail.ru", "ebay.co.uk", "naver.com", "hm.com", "hotstar.com", "bestbuy.com", "collinsdictionary.com"]

const categories = ["studying", "search", "news sites", "Shopping", "👸🏼<- those!! cray ones"]

// array pickers
function getArEl<T>(arr:Array<T>) : T {
    return arr[Math.floor(Math.random() * arr.length)]
}
function getUrl() {
    return getArEl(popularURls)
}
function getCategory() {
    return getArEl(categories)
}

// maybe-URLS
function getMaybeUrl() {
    let rando = Math.random()
    if(rando > 0.5) {
        return getUrl()
    } else {
        return undefined
    }
}

// prims
function getBool() {
    let rando = Math.random()
    return rando > 0.5
}
function numBetween(low: number, high:number) {
    return Math.floor((Math.random() * (high-low))+low)
}
function posNum(lessThan: number) {
    return numBetween(0, lessThan)
}

// counting, for uniques, eg
var nri = 0
function nextRandomInt() {
    let rando = Math.floor(Math.random() * 10)
    nri += rando
    return nri
}

// colors
function randoColString() {
    return posNum(256).toString(16)
}
function color() {
    return "0x" + randoColString() + randoColString() + randoColString()
}

// factories, sort of
function array<T>(max:number, cb : ()=>T) : Array<T> {
    max = posNum(max)
    let arr : T[] = []
    for(let i = 0; i < max; i++) {
        arr.push(cb())
    } 
    return arr
}

export const rando = {
    maybeUrl: getMaybeUrl,
    bool: getBool,
    next: {
        int: nextRandomInt
    },
    num: {
        pos: posNum
    },
    color: color,
    category: getCategory,
    array: array
}