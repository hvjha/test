module.exports = function TimeStory(string) {
    this.string = string,
        this.getLink = function () {
            let hrefRegex = /<a([^>]*?)href\s*=\s*(['"])([^\2]*?)\2\1*>/i
            return `https://www.time.com${hrefRegex.exec(this.string)[3]}`
        },
        this.getTitle = function () {
            let startString = `<h3 class="latest-stories__item-headline">`;
            let endString = `</h3>`;
            return (string.match(new RegExp(startString + "(.*)" + endString))[1])
        }
}