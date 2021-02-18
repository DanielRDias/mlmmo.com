<template>
  <div class="cookiedeclaration">
    <h1>Cookie Declaration</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    let CookieDeclaration = document.createElement("script");
    CookieDeclaration.setAttribute("id", "CookieDeclaration");
    CookieDeclaration.setAttribute(
      "src",
      "https://consent.cookiebot.com/847a26de-73a9-4c85-8144-496464c16706/cd.js"
    );
    CookieDeclaration.setAttribute("type", "text/javascript");
    CookieDeclaration.setAttribute("async", "");
    document.body.appendChild(CookieDeclaration);
  },
};
</script>