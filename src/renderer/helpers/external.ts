import { invoke } from "@helpers";

export const openApp = (shortcut: string) => invoke("openApplication", { path: shortcut });

export const openLink = (shortcut: string) => window.open(shortcut);

export const searchWebsite = (query: string, site: string) => {
    const parsedQuery = query.replace(" ", "+");

    if (site === "youtube.com") {
        window.open("https://www.youtube.com/results?search_query=" + parsedQuery);
    } else {
        let url = "https://www.google.com/search?q=" + parsedQuery;
        if (site !== "google.com") url = url + "+site:" + site;
        window.open(url);
    }
};
