const noodle = require('noodlejs');

const getDownloadLink = function(url) {
  noodle.query({
    url: url,
    selector: 'div.container a',
    extract: 'href'
  })
  .then(function (results) {
    console.log(results.results);
  });
}

const getDownloadLinkPages = function(url) {
  noodle.query({
    url: url,
    selector: 'table tr td a',
    extract: 'onclick'
  })
  .then(function (results) {
    console.log("result link download pages");
    console.log(results.results);

    var linksPages = new Array();
    results.results[0].results.forEach(function(data) {
      var string = data;
      string = string.split('\'').join('');
      const separatorsString = string.split("download_video(")[1].split(",");
      console.log(separatorsString);

      const idVideo = separatorsString[0];
      const qualityVideo = separatorsString[1];
      const tokenVideo = separatorsString[2];

      const url = "http://tiwi.kiwi/dl?op=download_orig&id=" + idVideo + "&mode=" + qualityVideo + "&hash=" + tokenVideo;
      linksPages.push(url);
    });

    console.log("pages links");
    console.log(linksPages);

    getDownloadLink(linksPages[0]);
  });
}

const getLinkForEpisode = function(url) {
  noodle.query({
    url: url,
    selector: 'div.download_feed_link a',
    extract: 'href'
  })
  .then(function (results) {
    console.log("result link download");
    console.log(results.results);

    const link = results.results[0].results[0];
    console.log("link page :");
    console.log(link);
    getDownloadLinkPages(link);
  });
}

const getLinks = function(url) {
  noodle.query({
    url: url,
    selector: 'article header.entry-header h2.entry-title a',
    extract: 'href'
  })
  .then(function (results) {
    console.log("results lniks = ");
    console.log(results.results[0].results);
    var links = new Array();


    results.results[0].results.forEach(function(currentLink) {
      if (currentLink) {
        links.push(currentLink);
      }
    });
    console.log("links : ");
    console.log(links);

    getLinkForEpisode(links[0]);
  });
}

getLinks("http://animehaven.org//?s=naruto");
