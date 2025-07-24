/**
 * AnZhiYu
 * Merge CDN
 */

"use strict";

const { version } = require("../../package.json");
const path = require("path");

hexo.extend.filter.register("before_generate", () => {
  const themeConfig = hexo.theme.config;
  const { CDN } = themeConfig;

  const thirdPartySrc = hexo.render.renderSync({ path: path.join(hexo.theme_dir, "/plugins.yml"), engine: "yaml" });
  const internalSrc = {
    main: {
      file: "https://npm.onmicrosoft.cn/o-bed@1.0.0/js/main.js",
    },
    utils: {
      file: "https://npm.onmicrosoft.cn/o-bed@1.0.0/js/utils.js",
    },
    translate: {
      file: "https://npm.onmicrosoft.cn/o-bed@1.0.0/js/tw_cn.js",
    },
    local_search: {
      file: "https://npm.onmicrosoft.cn/o-bed@1.0.0/js/local-search.js",
    },
    algolia_js: {
      file: "https://npm.onmicrosoft.cn/o-bed@1.0.0/js/algolia.js",
    },
    random_friends_post_js: {
      file: "https://npm.onmicrosoft.cn/o-bed@1.0.0/js/random_friends_post.js",
    },
    right_click_menu_js: {
      file: "https://npm.onmicrosoft.cn/o-bed@1.0.0/js/right_click_menu.js",
    },
    comment_barrage_js: {
      file: "https://npm.onmicrosoft.cn/o-bed@1.0.0/js/comment_barrage.js",
    },
    ai_abstract_js: {
      file: "https://npm.onmicrosoft.cn/o-bed@1.0.0/js/ai_abstract.js",
    },
    people_js: {
      file: "https://npm.onmicrosoft.cn/o-bed@1.0.0/js/people.js",
    },
  };

  const minFile = file => {
    return file.replace(/(?<!\.min)\.(js|css)$/g, ext => ".min" + ext);
  };

  const createCDNLink = (data, type, cond = "") => {
    Object.keys(data).map(key => {
      let { name, version, file, other_name } = data[key];

      const cdnjs_name = other_name || name;
      const cdnjs_file = file.replace(/^[lib|dist]*\/|browser\//g, "");
      const min_cdnjs_file = minFile(cdnjs_file);
      if (cond === "internal") file = `source/${file}`;
      const min_file = minFile(file);
      const verType = CDN.version ? `@${version}` : "";

      const value = {
        version,
        name,
        file,
        cdnjs_file,
        min_file,
        min_cdnjs_file,
        cdnjs_name,
      };
      const cdnSource = {
        local: cond === "internal" ? cdnjs_file : `/pluginsSrc/${name}/${file}`,
        jsdelivr: `https://cdn.jsdelivr.net/npm/${name}${verType}/${min_file}`,
        unpkg: `https://npm.onmicrosoft.cn/${name}${verType}/${file}`,
        cdnjs: `https://cdnjs.cloudflare.com/ajax/libs/${cdnjs_name}/${version}/${min_cdnjs_file}`,
        elemecdn: `https://npm.elemecdn.com/${name}${verType}/${file}`,
        onmicrosoft: `https://npm.onmicrosoft.cn/${name}${verType}/${file}`,
        cbd: `https://cdn.cbd.int/${name}${verType}/${file}`,
        anheyu: `https://cdn.anheyu.com/npm/${name}${verType}/${min_file}`,
        custom: (CDN.custom_format || "").replace(/\$\{(.+?)\}/g, (match, $1) => value[$1]),
      };

      data[key] = cdnSource[type];
    });

    if (cond === "internal") data["main_css"] = "https://npm.onmicrosoft.cn/o-bed@1.0.8/css/blog.min.css";
    return data;
  };

  // delete null value
  const deleteNullValue = obj => {
    if (!obj) return;
    for (const i in obj) {
      obj[i] === null && delete obj[i];
    }
    return obj;
  };

  themeConfig.asset = Object.assign(
    createCDNLink(internalSrc, CDN.internal_provider, "internal"),
    createCDNLink(thirdPartySrc, CDN.third_party_provider),
    deleteNullValue(CDN.option)
  );
});
