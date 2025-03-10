var region_dictionary = {
    "AF":"Afghanistan","AX":"Åland Islands","AL":"Albania","DZ":"Algeria","AS":"American Samoa","AD":"Andorra","AO":"Angola","AI":"Anguilla","AQ":"Antarctica","AG":"Antigua and Barbuda","AR":"Argentina","AM":"Armenia","AW":"Aruba","AU":"Australia","AT":"Austria","AZ":"Azerbaijan","BS":"Bahamas","BH":"Bahrain","BD":"Bangladesh","BB":"Barbados","BY":"Belarus","BE":"Belgium","BZ":"Belize","BJ":"Benin","BM":"Bermuda","BT":"Bhutan","BO":"Bolivia, Plurinational State of","BQ":"Bonaire, Sint Eustatius and Saba","BA":"Bosnia and Herzegovina","BW":"Botswana","BV":"Bouvet Island","BR":"Brazil","IO":"British Indian Ocean Territory","BN":"Brunei Darussalam","BG":"Bulgaria","BF":"Burkina Faso","BI":"Burundi","CV":"Cabo Verde","KH":"Cambodia","CM":"Cameroon","CA":"Canada","KY":"Cayman Islands","CF":"Central African Republic","TD":"Chad","CL":"Chile","CN":"China","CX":"Christmas Island","CC":"Cocos (Keeling) Islands","CO":"Colombia","KM":"Comoros","CG":"Congo","CD":"Congo, Democratic Republic of the","CK":"Cook Islands","CR":"Costa Rica","CI":"Côte d'Ivoire","HR":"Croatia","CU":"Cuba","CW":"Curaçao","CY":"Cyprus","CZ":"Czechia","DK":"Denmark","DJ":"Djibouti","DM":"Dominica","DO":"Dominican Republic","EC":"Ecuador","EG":"Egypt","SV":"El Salvador","GQ":"Equatorial Guinea","ER":"Eritrea","EE":"Estonia","SZ":"Eswatini","ET":"Ethiopia","FK":"Falkland Islands (Malvinas)","FO":"Faroe Islands","FJ":"Fiji","FI":"Finland","FR":"France","GF":"French Guiana","PF":"French Polynesia","TF":"French Southern Territories","GA":"Gabon","GM":"Gambia","GE":"Georgia","DE":"Germany","GH":"Ghana","GI":"Gibraltar","GR":"Greece","GL":"Greenland","GD":"Grenada","GP":"Guadeloupe","GU":"Guam","GT":"Guatemala","GG":"Guernsey","GN":"Guinea","GW":"Guinea-Bissau","GY":"Guyana","HT":"Haiti","HM":"Heard Island and McDonald Islands","VA":"Holy See","HN":"Honduras","HK":"Hong Kong","HU":"Hungary","IS":"Iceland","IN":"India","ID":"Indonesia","IR":"Iran, Islamic Republic of","IQ":"Iraq","IE":"Ireland","IM":"Isle of Man","IL":"Israel","IT":"Italy","JM":"Jamaica","JP":"Japan","JE":"Jersey","JO":"Jordan","KZ":"Kazakhstan","KE":"Kenya","KI":"Kiribati","KP":"Korea, Democratic People's Republic of","KR":"Korea, Republic of","KW":"Kuwait","KG":"Kyrgyzstan","LA":"Lao People's Democratic Republic","LV":"Latvia","LB":"Lebanon","LS":"Lesotho","LR":"Liberia","LY":"Libya","LI":"Liechtenstein","LT":"Lithuania","LU":"Luxembourg","MO":"Macao","MG":"Madagascar","MW":"Malawi","MY":"Malaysia","MV":"Maldives","ML":"Mali","MT":"Malta","MH":"Marshall Islands","MQ":"Martinique","MR":"Mauritania","MU":"Mauritius","YT":"Mayotte","MX":"Mexico","FM":"Micronesia, Federated States of","MD":"Moldova, Republic of","MC":"Monaco","MN":"Mongolia","ME":"Montenegro","MS":"Montserrat","MA":"Morocco","MZ":"Mozambique","MM":"Myanmar","NA":"Namibia","NR":"Nauru","NP":"Nepal","NL":"Netherlands, Kingdom of the","NC":"New Caledonia","NZ":"New Zealand","NI":"Nicaragua","NE":"Niger","NG":"Nigeria","NU":"Niue","NF":"Norfolk Island","MK":"North Macedonia","MP":"Northern Mariana Islands","NO":"Norway","OM":"Oman","PK":"Pakistan","PW":"Palau","PS":"Palestine, State of","PA":"Panama","PG":"Papua New Guinea","PY":"Paraguay","PE":"Peru","PH":"Philippines","PN":"Pitcairn","PL":"Poland","PT":"Portugal","PR":"Puerto Rico","QA":"Qatar","RE":"Réunion","RO":"Romania","RU":"Russian Federation","RW":"Rwanda","BL":"Saint Barthélemy","SH":"Saint Helena, Ascension and Tristan da Cunha","KN":"Saint Kitts and Nevis","LC":"Saint Lucia","MF":"Saint Martin (French part)","PM":"Saint Pierre and Miquelon","VC":"Saint Vincent and the Grenadines","WS":"Samoa","SM":"San Marino","ST":"Sao Tome and Principe","SA":"Saudi Arabia","SN":"Senegal","RS":"Serbia","SC":"Seychelles","SL":"Sierra Leone","SG":"Singapore","SX":"Sint Maarten (Dutch part)","SK":"Slovakia","SI":"Slovenia","SB":"Solomon Islands","SO":"Somalia","ZA":"South Africa","GS":"South Georgia and the South Sandwich Islands","SS":"South Sudan","ES":"Spain","LK":"Sri Lanka","SD":"Sudan","SR":"Suriname","SJ":"Svalbard and Jan Mayen","SE":"Sweden","CH":"Switzerland","SY":"Syrian Arab Republic","TW":"Taiwan, Province of China","TJ":"Tajikistan","TZ":"Tanzania, United Republic of","TH":"Thailand","TL":"Timor-Leste","TG":"Togo","TK":"Tokelau","TO":"Tonga","TT":"Trinidad and Tobago","TN":"Tunisia","TR":"Türkiye","TM":"Turkmenistan","TC":"Turks and Caicos Islands","TV":"Tuvalu","UG":"Uganda","UA":"Ukraine","AE":"United Arab Emirates","GB":"United Kingdom of Great Britain and Northern Ireland","US":"United States of America","UM":"United States Minor Outlying Islands","UY":"Uruguay","UZ":"Uzbekistan","VU":"Vanuatu","VE":"Venezuela, Bolivarian Republic of","VN":"Viet Nam","VG":"Virgin Islands (British)","VI":"Virgin Islands (U.S.)","WF":"Wallis and Futuna","EH":"Western Sahara","YE":"Yemen","ZM":"Zambia","ZW":"Zimbabwe"
};

// console save (downloads the resulting data to a file)
(function(console){
    console.save = function(data, filename){
    
        if(!data) {
            console.error('Console.save: No data')
            return;
        }
    
        if(!filename) filename = 'console.json'
    
        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, '\t')
        }
    
        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')
    
        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
     }
    })(console)
// ----------------------------------------------


// getting all the links for the series
function getXhr(request) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open(request.method, request.url, true);
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.responseText);
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function() {
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

async function getUrlList(){
    const currentPath = window.location.pathname;
    try {
        const resp = await getXhr({
            method: 'GET',
            url: `https://apis.justwatch.com/content/urls?path=${currentPath}`
        });
        const resp_object = JSON.parse(resp);
        return resp_object
    } catch (error) {
        console.error("Error fetching URL list:", error);
        return null;
    }
}
// ----------------------------------------------





// getting info for each region of the series
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function entryToBody(entry) {
    fullPath = entry.href
    language = entry.href_lang.split('-')[0]
    country = entry.href_lang.split('-')[1]
    const request = {
    "operationName": "GetUrlTitleDetails",
    "variables": {
        "platform": "WEB",
        "first": 10,
        "fullPath": fullPath,
        "language": language,
        "country": country,
        "episodeMaxLimit": 20,
        "allowSponsoredRecommendations": {
            "pageType": "VIEW_TITLE_DETAIL",
            "placement": "DETAIL_PAGE",
            "language": language,
            "country": country,
            "applicationContext": {
                "appID": "3.9.3-webapp#dc81a74",
                "platform": "webapp",
                "version": "3.9.3",
                "build": "dc81a74",
                "isTestBuild": false
            },
            "appId": "3.9.3-webapp#dc81a74",
            "platform": "WEB",
            "supportedFormats": [
                "IMAGE",
                "VIDEO"
            ],
            "supportedObjectTypes": [
                "MOVIE",
                "SHOW",
                "GENERIC_TITLE_LIST",
                "SHOW_SEASON"
            ],
            "alwaysReturnBidID": true,
            "testingModeForceHoldoutGroup": false,
            "testingMode": false
        }
    },
        "query": `query GetUrlTitleDetails($fullPath: String!, $country: Country!, $language: Language!, $episodeMaxLimit: Int, $platform: Platform! = WEB, $allowSponsoredRecommendations: SponsoredRecommendationsInput, $format: ImageFormat, $backdropProfile: BackdropProfile, $streamingChartsFilter: StreamingChartsFilter, $first: Int! = 10) {\n  urlV2(fullPath: $fullPath) {\n    id\n    metaDescription\n    metaKeywords\n    metaRobots\n    metaTitle\n    heading1\n    heading2\n    htmlContent\n    node {\n      ...TitleDetails\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment TitleDetails on MovieOrShowOrSeason {\n  id\n  objectType\n  objectId\n  __typename\n  plexPlayerOffers: offers(\n    country: $country\n    platform: $platform\n    filter: {packages: [\"pxp\"], preAffiliate: true}\n  ) {\n    ...WatchNowOffer\n    __typename\n  }\n  justwatchTVOffers: offers(\n    country: $country\n    platform: $platform\n    filter: {packages: [\"jwt\"], preAffiliate: true}\n  ) {\n    ...WatchNowOffer\n    __typename\n  }\n  maxOfferUpdatedAt(country: $country, platform: WEB)\n  disneyOffersCount: offerCount(\n    country: $country\n    platform: $platform\n    filter: {packages: [\"dnp\"]}\n  )\n  starOffersCount: offerCount(\n    country: $country\n    platform: $platform\n    filter: {packages: [\"srp\"]}\n  )\n  offerCount(country: $country, platform: $platform)\n  uniqueOfferCount: offerCount(\n    country: $country\n    platform: $platform\n    filter: {bestOnly: true}\n  )\n  offers(country: $country, platform: $platform, filter: {preAffiliate: true}) {\n    ...TitleOffer\n    __typename\n  }\n  watchNowOffer(country: $country, platform: $platform) {\n    ...WatchNowOffer\n    __typename\n  }\n  promotedBundles(country: $country, platform: $platform) {\n    promotionUrl\n    __typename\n  }\n  availableTo(country: $country, platform: $platform) {\n    availableCountDown(country: $country)\n    availableToDate\n    package {\n      id\n      shortName\n      __typename\n    }\n    __typename\n  }\n  fallBackClips: content(country: $country, language: \"en\") {\n    clips {\n      ...TrailerClips\n      __typename\n    }\n    videobusterClips: clips(providers: [VIDEOBUSTER]) {\n      ...TrailerClips\n      __typename\n    }\n    dailymotionClips: clips(providers: [DAILYMOTION]) {\n      ...TrailerClips\n      __typename\n    }\n    __typename\n  }\n  content(country: $country, language: $language) {\n    backdrops {\n      backdropUrl\n      __typename\n    }\n    fullBackdrops: backdrops(profile: S1920, format: JPG) {\n      backdropUrl\n      __typename\n    }\n    clips {\n      ...TrailerClips\n      __typename\n    }\n    videobusterClips: clips(providers: [VIDEOBUSTER]) {\n      ...TrailerClips\n      __typename\n    }\n    dailymotionClips: clips(providers: [DAILYMOTION]) {\n      ...TrailerClips\n      __typename\n    }\n    externalIds {\n      imdbId\n      __typename\n    }\n    fullPath\n    posterUrl\n    fullPosterUrl: posterUrl(profile: S718, format: JPG)\n    runtime\n    isReleased\n    scoring {\n      imdbScore\n      imdbVotes\n      tmdbPopularity\n      tmdbScore\n      jwRating\n      tomatoMeter\n      certifiedFresh\n      __typename\n    }\n    shortDescription\n    title\n    originalReleaseYear\n    originalReleaseDate\n    upcomingReleases {\n      releaseCountDown(country: $country)\n      releaseDate\n      releaseType\n      label\n      package {\n        id\n        packageId\n        shortName\n        clearName\n        monetizationTypes\n        icon(profile: S100)\n        iconWide(profile: S160)\n        hasRectangularIcon(country: $country, platform: WEB)\n        planOffers(country: $country, platform: $platform) {\n          retailPrice(language: $language)\n          durationDays\n          presentationType\n          isTrial\n          retailPriceValue\n          currency\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    genres {\n      shortName\n      translation(language: $language)\n      __typename\n    }\n    subgenres {\n      content(country: $country, language: $language) {\n        shortName\n        name\n        __typename\n      }\n      __typename\n    }\n    textRecommendations(first: $first) {\n      id\n      __typename\n    }\n    ... on MovieOrShowOrSeasonContent {\n      subgenres {\n        content(country: $country, language: $language) {\n          url: moviesUrl {\n            fullPath\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on MovieOrShowContent {\n      originalTitle\n      ageCertification\n      credits {\n        role\n        name\n        characterName\n        personId\n        __typename\n      }\n      interactions {\n        dislikelistAdditions\n        likelistAdditions\n        votesNumber\n        __typename\n      }\n      productionCountries\n      __typename\n    }\n    ... on SeasonContent {\n      seasonNumber\n      interactions {\n        dislikelistAdditions\n        likelistAdditions\n        votesNumber\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  recommendedByCount\n  watchedByCount\n  popularityRank(country: $country) {\n    rank\n    trend\n    trendDifference\n    __typename\n  }\n  streamingCharts(country: $country, filter: $streamingChartsFilter) {\n    edges {\n      streamingChartInfo {\n        rank\n        trend\n        trendDifference\n        updatedAt\n        daysInTop10\n        daysInTop100\n        daysInTop1000\n        daysInTop3\n        topRank\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  likelistEntry {\n    createdAt\n    __typename\n  }\n  dislikelistEntry {\n    createdAt\n    __typename\n  }\n  ... on MovieOrShow {\n    watchlistEntryV2 {\n      createdAt\n      __typename\n    }\n    customlistEntries {\n      createdAt\n      genericTitleList {\n        id\n        __typename\n      }\n      __typename\n    }\n    similarTitlesV2(\n      country: $country\n      allowSponsoredRecommendations: $allowSponsoredRecommendations\n    ) {\n      sponsoredAd {\n        ...SponsoredAd\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  ... on Movie {\n    permanentAudiences\n    seenlistEntry {\n      createdAt\n      __typename\n    }\n    __typename\n  }\n  ... on Show {\n    permanentAudiences\n    totalSeasonCount\n    seenState(country: $country) {\n      progress\n      seenEpisodeCount\n      __typename\n    }\n    tvShowTrackingEntry {\n      createdAt\n      __typename\n    }\n    offers(country: $country, platform: $platform, filter: {preAffiliate: true}) {\n      ...TitleOffer\n      __typename\n    }\n    seasons(sortDirection: DESC) {\n      id\n      objectId\n      objectType\n      totalEpisodeCount\n      availableTo(country: $country, platform: $platform) {\n        availableToDate\n        availableCountDown(country: $country)\n        package {\n          id\n          shortName\n          __typename\n        }\n        __typename\n      }\n      offers(\n        country: $country\n        platform: $platform\n        filter: {monetizationTypes: [BUY, RENT], preAffiliate: true}\n      ) {\n        package {\n          clearName\n          shortName\n          __typename\n        }\n        monetizationType\n        retailPrice(language: $language)\n        retailPriceValue\n        __typename\n      }\n      content(country: $country, language: $language) {\n        posterUrl\n        seasonNumber\n        fullPath\n        title\n        upcomingReleases {\n          releaseDate\n          releaseCountDown(country: $country)\n          __typename\n        }\n        isReleased\n        originalReleaseYear\n        __typename\n      }\n      show {\n        __typename\n        id\n        objectId\n        objectType\n        watchlistEntryV2 {\n          createdAt\n          __typename\n        }\n        content(country: $country, language: $language) {\n          title\n          __typename\n        }\n      }\n      fallBackClips: content(country: $country, language: \"en\") {\n        clips {\n          ...TrailerClips\n          __typename\n        }\n        videobusterClips: clips(providers: [VIDEOBUSTER]) {\n          ...TrailerClips\n          __typename\n        }\n        dailymotionClips: clips(providers: [DAILYMOTION]) {\n          ...TrailerClips\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    recentEpisodes: episodes(\n      sortDirection: DESC\n      limit: 3\n      releasedInCountry: $country\n    ) {\n      ...Episode\n      __typename\n    }\n    __typename\n  }\n  ... on Season {\n    totalEpisodeCount\n    episodes(limit: $episodeMaxLimit) {\n      ...Episode\n      __typename\n    }\n    show {\n      __typename\n      id\n      objectId\n      objectType\n      totalSeasonCount\n      customlistEntries {\n        createdAt\n        genericTitleList {\n          id\n          __typename\n        }\n        __typename\n      }\n      tvShowTrackingEntry {\n        createdAt\n        __typename\n      }\n      fallBackClips: content(country: $country, language: \"en\") {\n        clips {\n          ...TrailerClips\n          __typename\n        }\n        videobusterClips: clips(providers: [VIDEOBUSTER]) {\n          ...TrailerClips\n          __typename\n        }\n        dailymotionClips: clips(providers: [DAILYMOTION]) {\n          ...TrailerClips\n          __typename\n        }\n        __typename\n      }\n      content(country: $country, language: $language) {\n        title\n        ageCertification\n        fullPath\n        genres {\n          shortName\n          __typename\n        }\n        credits {\n          role\n          name\n          characterName\n          personId\n          __typename\n        }\n        productionCountries\n        externalIds {\n          imdbId\n          __typename\n        }\n        upcomingReleases {\n          releaseDate\n          releaseType\n          package {\n            id\n            shortName\n            planOffers(country: $country, platform: $platform) {\n              retailPrice(language: $language)\n              durationDays\n              presentationType\n              isTrial\n              retailPriceValue\n              currency\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        backdrops {\n          backdropUrl\n          __typename\n        }\n        posterUrl\n        isReleased\n        videobusterClips: clips(providers: [VIDEOBUSTER]) {\n          ...TrailerClips\n          __typename\n        }\n        dailymotionClips: clips(providers: [DAILYMOTION]) {\n          ...TrailerClips\n          __typename\n        }\n        __typename\n      }\n      seenState(country: $country) {\n        progress\n        __typename\n      }\n      watchlistEntryV2 {\n        createdAt\n        __typename\n      }\n      dislikelistEntry {\n        createdAt\n        __typename\n      }\n      likelistEntry {\n        createdAt\n        __typename\n      }\n      similarTitlesV2(\n        country: $country\n        allowSponsoredRecommendations: $allowSponsoredRecommendations\n      ) {\n        sponsoredAd {\n          ...SponsoredAd\n          __typename\n        }\n        __typename\n      }\n    }\n    seenState(country: $country) {\n      progress\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment WatchNowOffer on Offer {\n  id\n  standardWebURL\n  preAffiliatedStandardWebURL\n  streamUrl\n  package {\n    id\n    icon\n    packageId\n    clearName\n    shortName\n    technicalName\n    iconWide(profile: S160)\n    hasRectangularIcon(country: $country, platform: WEB)\n    __typename\n  }\n  retailPrice(language: $language)\n  retailPriceValue\n  lastChangeRetailPriceValue\n  currency\n  presentationType\n  monetizationType\n  availableTo\n  dateCreated\n  __typename\n}\n\nfragment TitleOffer on Offer {\n  id\n  presentationType\n  monetizationType\n  retailPrice(language: $language)\n  retailPriceValue\n  currency\n  lastChangeRetailPriceValue\n  type\n  package {\n    id\n    packageId\n    clearName\n    shortName\n    technicalName\n    icon(profile: S100)\n    iconWide(profile: S160)\n    planOffers(country: $country, platform: WEB) {\n      title\n      retailPrice(language: $language)\n      isTrial\n      durationDays\n      retailPriceValue\n      children {\n        title\n        retailPrice(language: $language)\n        isTrial\n        durationDays\n        retailPriceValue\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  standardWebURL\n  preAffiliatedStandardWebURL\n  streamUrl\n  elementCount\n  availableTo\n  subtitleLanguages\n  videoTechnology\n  audioTechnology\n  audioLanguages(language: $language)\n  __typename\n}\n\nfragment TrailerClips on Clip {\n  sourceUrl\n  externalId\n  provider\n  name\n  __typename\n}\n\nfragment SponsoredAd on SponsoredRecommendationAd {\n  bidId\n  holdoutGroup\n  campaign {\n    name\n    backgroundImages {\n      imageURL\n      size\n      __typename\n    }\n    countdownTimer\n    creativeType\n    disclaimerText\n    externalTrackers {\n      type\n      data\n      __typename\n    }\n    hideDetailPageButton\n    hideImdbScore\n    hideJwScore\n    hideRatings\n    hideContent\n    posterOverride\n    promotionalImageUrl\n    promotionalVideo {\n      url\n      __typename\n    }\n    promotionalTitle\n    promotionalText\n    promotionalProviderLogo\n    promotionalProviderWideLogo\n    watchNowLabel\n    watchNowOffer {\n      ...WatchNowOffer\n      __typename\n    }\n    nodeOverrides {\n      nodeId\n      promotionalImageUrl\n      watchNowOffer {\n        standardWebURL\n        __typename\n      }\n      __typename\n    }\n    node {\n      nodeId: id\n      __typename\n      ... on MovieOrShowOrSeason {\n        content(country: $country, language: $language) {\n          fullPath\n          posterUrl\n          title\n          originalReleaseYear\n          scoring {\n            imdbScore\n            jwRating\n            __typename\n          }\n          genres {\n            shortName\n            translation(language: $language)\n            __typename\n          }\n          externalIds {\n            imdbId\n            __typename\n          }\n          backdrops(format: $format, profile: $backdropProfile) {\n            backdropUrl\n            __typename\n          }\n          isReleased\n          __typename\n        }\n        objectId\n        objectType\n        offers(country: $country, platform: $platform, filter: {preAffiliate: true}) {\n          monetizationType\n          presentationType\n          package {\n            id\n            packageId\n            __typename\n          }\n          id\n          __typename\n        }\n        __typename\n      }\n      ... on MovieOrShow {\n        watchlistEntryV2 {\n          createdAt\n          __typename\n        }\n        __typename\n      }\n      ... on Show {\n        seenState(country: $country) {\n          seenEpisodeCount\n          __typename\n        }\n        __typename\n      }\n      ... on Season {\n        content(country: $country, language: $language) {\n          seasonNumber\n          __typename\n        }\n        show {\n          __typename\n          id\n          objectId\n          objectType\n          content(country: $country, language: $language) {\n            originalTitle\n            __typename\n          }\n          watchlistEntryV2 {\n            createdAt\n            __typename\n          }\n        }\n        __typename\n      }\n      ... on GenericTitleList {\n        followedlistEntry {\n          createdAt\n          name\n          __typename\n        }\n        id\n        type\n        content(country: $country, language: $language) {\n          name\n          visibility\n          __typename\n        }\n        titles(country: $country, first: 40) {\n          totalCount\n          edges {\n            cursor\n            node: nodeV2 {\n              content(country: $country, language: $language) {\n                fullPath\n                posterUrl\n                title\n                originalReleaseYear\n                scoring {\n                  imdbVotes\n                  imdbScore\n                  tomatoMeter\n                  certifiedFresh\n                  jwRating\n                  __typename\n                }\n                isReleased\n                __typename\n              }\n              id\n              objectId\n              objectType\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment Episode on Episode {\n  id\n  objectId\n  objectType\n  seenlistEntry {\n    createdAt\n    __typename\n  }\n  uniqueOfferCount: offerCount(\n    country: $country\n    platform: $platform\n    filter: {bestOnly: true}\n  )\n  flatrate: offers(\n    country: $country\n    platform: $platform\n    filter: {monetizationTypes: [FLATRATE_AND_BUY, FLATRATE, ADS, CINEMA, FREE], bestOnly: true, preAffiliate: true}\n  ) {\n    id\n    package {\n      id\n      clearName\n      packageId\n      __typename\n    }\n    __typename\n  }\n  buy: offers(\n    country: $country\n    platform: $platform\n    filter: {monetizationTypes: [BUY], bestOnly: true, preAffiliate: true}\n  ) {\n    id\n    package {\n      id\n      clearName\n      packageId\n      __typename\n    }\n    __typename\n  }\n  rent: offers(\n    country: $country\n    platform: $platform\n    filter: {monetizationTypes: [RENT], bestOnly: true, preAffiliate: true}\n  ) {\n    id\n    package {\n      id\n      clearName\n      packageId\n      __typename\n    }\n    __typename\n  }\n  free: offers(\n    country: $country\n    platform: $platform\n    filter: {monetizationTypes: [ADS, FREE], bestOnly: true, preAffiliate: true}\n  ) {\n    id\n    package {\n      id\n      clearName\n      packageId\n      __typename\n    }\n    __typename\n  }\n  fast: offers(\n    country: $country\n    platform: $platform\n    filter: {monetizationTypes: [FAST], bestOnly: true, preAffiliate: true}\n  ) {\n    id\n    package {\n      id\n      clearName\n      packageId\n      __typename\n    }\n    __typename\n  }\n  content(country: $country, language: $language) {\n    title\n    shortDescription\n    episodeNumber\n    seasonNumber\n    isReleased\n    runtime\n    upcomingReleases {\n      releaseDate\n      label\n      package {\n        id\n        packageId\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n`
    }
    return request
}

function postXhr(request, body = null) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open(request.method, request.url, true); // true for asynchronous
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log(`fetching code: ${xhr.status}`)
                resolve(xhr.responseText);
            } else {
                console.log(`ERROR!\n status:${xhr.status}\n statusText:${xhr.statusText}`)
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function() {
            console.log(`ERROR!\n status:${xhr.status}\n statusText:${xhr.statusText}`)
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        xhr.send(JSON.stringify(body));
    });
}

async function getInfoItem(entry){
    try {
        const body = entryToBody(entry)
        const resp = await postXhr({
            method: 'POST',
            url: `https://apis.justwatch.com/graphql`
        }, body);
        const resp_object = JSON.parse(resp);
        return resp_object
    } catch (error) {
        console.error("Error fetching URL list:", error);
        return null;
    }
}

async function getAllRegionInfo(entries, sleep_ms=3000, limit=0){
    const data = {
        AvailableSeasons: [],
        totalEpisodes: 0,
        RegionContents: {},
    }

    var index = 0
    for(entry of entries){
        
        if(limit != 0 && index >= limit){
            break
        }

        await sleep(sleep_ms)

        index += 1
        const region_template = {
            RegionCode: "",
            RegionProviders: {},
        }

        console.log(`grabbing region info for: ${entry.href_lang} (${index}/${entries.length})`)
        const info = await getInfoItem(entry)
        const node = info.data.urlV2.node
        const region = entry.href_lang.split('-')[1]
        console.log(`loading region info: ${region}`)

        if(index == 1){
            const season_list = node.seasons.reverse()
            for (season of season_list){
                
                const season_template = {
                    Season: season.content.seasonNumber,
                    EpisodesTotal: season.totalEpisodeCount,
                }
                
                data.AvailableSeasons.push(season_template)
                data.totalEpisodes += season.totalEpisodeCount
            }
        }

        const offers = node.offers

        for (offer of offers){
            const provider_template = {
                AvailableSeasons:offer.elementCount,
                Price: offer.retailPriceValue,
                Platform: offer.package.clearName,
                Quality: offer.presentationType,
                MonetizationType: offer.monetizationType,
            }
            region_template.RegionProviders[`${offer.package.clearName} (${offer.monetizationType}) [${offer.presentationType}]`] = provider_template
        }

        region_template.RegionCode = region

        console.log(region_template)

        data.RegionContents[region_dictionary[region]] = region_template
    }
    console.log(`All region info grabbed`)
    return data
}
// ----------------------------------------------




// my personal filter (i only watch series available on Max)
function postprocessedResult(data){
    RegionContents = data.RegionContents

    for (var [key, region] of Object.entries(RegionContents)){
        Object.keys(region.RegionProviders).filter(key=>!key.includes("Max")).forEach(key=>delete region.RegionProviders[key])

        if( Object.keys(region.RegionProviders).length == 0){
            delete RegionContents[key]
        }
    }

    data.RegionContents = RegionContents
    console.log("Filtered result for regions with HBO MAX:")
    console.log(data)

    var flatten = Object.keys(data.RegionContents).map(country => {
        return Object.keys(data.RegionContents[country].RegionProviders).map(provider => {
            return `${country}: ${provider}, seasons: ${data.RegionContents[country].RegionProviders[provider].AvailableSeasons}`
        }).join("\n")
    }).join("\n")
    console.log(flatten)
}
// ----------------------------------------------





// execution zone
await (async () => {
    var sleep_ms = 8000
    
    var url_list_resp = await getUrlList()
    var region_entries = url_list_resp.href_lang_tags
    
    var data = await getAllRegionInfo(region_entries, sleep_ms)
    var file_name = url_list_resp.heading_1.replaceAll(" ","_")

    console.save(data, `raw-${file_name}.json`)

    try {
        postprocessedResult(data)
    } catch (error) {
        console.error("Error filtering data:", error);
    }
    console.save(data, `filtered-${file_name}.json`)
})()
// ----------------------------------------------
