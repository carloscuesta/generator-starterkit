# <%= appname %>

> <%= appdescription %>

## Technologies

- [**Gulp**](http://gulpjs.com)<% if (templateLang == 'jade') { %>
- [**Jade**](http://jade-lang.com)<% } else { %>
- [**Html**](https://developer.mozilla.org/es/docs/HTML/HTML5)<% } %> <% if (cssPrepro == 'less') { %>
- [**Less**](http://lesscss.org)<% } else {%>
- [**Sass**](http://sass-lang.com) <% } %> <% if (useBabel == true) { %>
- [**Babel**](https://babeljs.io)<% } if (jsLinter == 'jscs') {%>
- [**JSCS**](http://jscs.info) <% } else {%>
- [**JSHint**](http://jshint.com) <% } %>

## Install and Use

### Install

```bash
npm install -g <%= appname %>
```

### Use 

```bash
yo <%= appname %>
```

# Author 

<%= appauthor %> - <%= appemail %>

# License 

The code is available under the **<%= applicense %>** license. 
