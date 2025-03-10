// ------------------------ EXAMPLE ZONEEE ------------------------
const example_entries = [
    {
        "locale":"en_CA",
        "href_lang":"en-CA",
        "href":"/ca/tv-show/regular-show",
        "has_noindex":false
    },
    {
        "locale": "en_ID",
        "href_lang": "en-ID",
        "href": "/id/tv-show/regular-show",
        "has_noindex": true,
    }
]
// ^^^^^^^^^^^^^^^^^^^^^^^^ EXAMPLE ZONEEE ^^^^^^^^^^^^^^^^^^^^^^^^





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

async function getAllRegionInfo(enties){
    var region_contents = []
    for(entry of enties){

        const region_template = {
            Region: "",
            RegionAvailableSeasons: [],
            RegionTotalEpisodes: 0,
            RegionProviderList: [],
        }

        console.log(`grabbing region info for: ${entry.href_lang}`)
        const info = await getInfoItem(entry)
        const node = info.data.urlV2.node
        const region = entry.href_lang.split('-')[1]

        const season_list = node.seasons
        for (season of season_list){
            
            const season_template = {
                Season: season.content.seasonNumber,
                EpisodesTotal: season.totalEpisodeCount,
            }

            region_template.RegionAvailableSeasons.push(season_template)
            region_template.RegionTotalEpisodes += season.totalEpisodeCount
        }

        const offers = node.offers

        for (offer of offers){
            const provider_template = {
                Provider: offer.package.clearName,
                AvailableSeasons:offer.elementCount
            }
            region_template.RegionProviderList.push(provider_template)
        }

        region_template.Region = region

        region_contents.push(region_template)

        await sleep(5000)
    }
    console.log(`All region info grabbed`)
    return region_contents
}

var data = await getAllRegionInfo(example_entries)