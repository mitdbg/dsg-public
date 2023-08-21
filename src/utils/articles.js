const axios = require('axios')
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const fs = require('fs')

const csvWriter = createCsvWriter({
  path: './articles.csv',
  header: ['year', 'title', 'authors', 'venue', 'url', 'id']
})

const process_author = author => {
  const split_author = author.split(' ')
  if (!isNaN(parseInt(split_author[split_author.length - 1]))) {
    return split_author.slice(0, split_author.length - 1).join(' ')
  } else {
    return author
  }
}

const pull_single_articles = async (author) => {
  const BASE_URL = 'https://dblp.org/search/publ/api?format=json&h=1000'

  const { data } = await axios.get(`${BASE_URL}&q=${author}`)

  let { hits: { hit: papers } } = data.result

  // papers.sort((a, b) => b.info.year - a.info.year)

  // console.log(papers.slice(0, 2))

  const year = new Date().getFullYear()

  papers = papers.filter(paper => year - paper.info.year <= 5)
  
  for (let i = 0; i < papers.length; i++) {
    if (Array.isArray(papers[i].info.authors.author)) {
      papers[i].info.authors = (papers[i].info.authors.author.map(author => process_author(author.text))).join(', ')
    } else {
      papers[i].info.authors = papers[i].info.authors.author.text
    }
    
  }

  return papers

  // console.log(hit.length)
}

const pull_articles = async () => {
  let promises = []

  for (let author of ['sam madden', 'mike cafarella', 'mike stonebraker', 'tim kraska']) {
    promises.push(pull_single_articles(author))
  }

  let papers = await Promise.all(promises)
  papers = papers.flat()
  console.log(papers.length)

  const id_set = new Set()

  let unique_papers = []
  for (let paper of papers) {
    if (!id_set.has(paper['@id'])) {
      unique_papers.push(paper)
      id_set.add(paper['@id'])
    }
  }

  unique_papers.sort((a, b) => b.info.year - a.info.year)

  console.log(unique_papers.length)

  unique_papers = unique_papers.map(paper => {
    return {...paper.info, id: paper['@id']}
  })

  console.log(unique_papers[0])
  console.log(unique_papers[unique_papers.length - 1])

  fs.writeFileSync('../json/pubs.json', JSON.stringify(unique_papers))

  // await csvWriter.writeRecords(unique_papers)
  // await writeJsonFile('../json/pubs.json', unique_papers)
}

pull_articles()
