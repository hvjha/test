
module.exports = async function(string) {
    const arrayOfindices =  createStringIndicesForLatestStories(string);
    let substrings = [];
    for (let i = 0; i < arrayOfindices.length - 1; i++) {
        substrings.push(string.slice(arrayOfindices[i], arrayOfindices[i + 1]))
    }
    return substrings;
}

function createStringIndicesForLatestStories(string) {
    let regex = /latest-stories__item/g, result, indices = [];
    let counter = 0;
    while ((result = regex.exec(string))) {
        if (counter % 3 === 0) {
            indices.push(result.index);
        }
        counter = counter + 1
    }
    indices.push(indices[indices.length - 1] + 250)
    return indices;

}
