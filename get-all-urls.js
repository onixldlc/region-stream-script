function getXhr(request) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open(request.method, request.url, true); // true for asynchronous
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

var resp = await getUrlList()
var url_list = resp.href_lang_tags