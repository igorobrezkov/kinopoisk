import { ref } from "vue";

export const getStyle = (rating: number): string => {

  if (rating >= 8) return 'yelow';
  else if (rating < 8 && rating >= 7) return 'green';
  else if (rating < 7 && rating >= 5) return 'gray';
  else if (rating < 5) return 'red';
  else return 'more'
}

export const toHoursAndMinutes = (TotalMinutes: number) => {
  const minutes = TotalMinutes % 60;
  const hours = Math.floor(TotalMinutes / 60);

  return `${(hours)} ч ${(minutes)} мин`
}


export const genreTitle = ref<string[]>([])
export const genreTitleSearh = ref<string[]>([])

export const genre = (item: string, search = false) => {
  switch (item) {
    case 'history':
      if (!genreTitle.value.includes(item) && search === false)
        genreTitle.value.push('историческое');
      else if (!genreTitleSearh.value.includes(item) && search === true)
        genreTitleSearh.value.push('историческое');
      break;
    case 'horror':
      if (!genreTitle.value.includes(item) && search === false)
        genreTitle.value.push('хоррор');
      else if (!genreTitleSearh.value.includes(item) && search === true)
        genreTitleSearh.value.push('хоррор');
      break;
    case 'scifi':
      if (!genreTitle.value.includes(item) && search === false)
        genreTitle.value.push('фантастика');
      else if (!genreTitleSearh.value.includes(item) && search === true)
        genreTitleSearh.value.push('фантастика')
      break;
    case 'stand-up':
      if (!genreTitle.value.includes(item) && search === false)
        genreTitle.value.push('комедия');
      else if (!genreTitleSearh.value.includes(item) && search === true)
        genreTitleSearh.value.push('комедия');
      break;
    case 'fantasy':
      if (!genreTitle.value.includes(item) && search === false)
        genreTitle.value.push('фентэзи');
      else if (!genreTitleSearh.value.includes(item) && search === true)
        genreTitleSearh.value.push('фентэзи');
      break;
    case 'drama':
      if (!genreTitle.value.includes(item) && search === false)
        genreTitle.value.push('драма');
      else if (!genreTitleSearh.value.includes(item) && search === true)
        genreTitleSearh.value.push('драма');
      break;
    case 'mystery':
      if (!genreTitle.value.includes(item) && search === false)
        genreTitle.value.push('мистика');
      else if (!genreTitleSearh.value.includes(item) && search === true)
        genreTitleSearh.value.push('мистика');
      break;
    case 'family':
      if (!genreTitle.value.includes(item) && search === false)
        genreTitle.value.push('семейное');
      else if (!genreTitleSearh.value.includes(item) && search === true)
        genreTitleSearh.value.push('семейное');
      break;
    case 'comedy':
      if (!genreTitle.value.includes(item) && search === false)
        genreTitle.value.push('комедия');
      else if (!genreTitleSearh.value.includes(item) && search === true)
        genreTitleSearh.value.push('комедия');
      break;
    case 'romance':
      if (!genreTitle.value.includes(item) && search === false)
        genreTitle.value.push('романтика');
      else if (!genreTitleSearh.value.includes(item) && search === true)
        genreTitleSearh.value.push('романтика');
      break;
    case 'music':
      if (!genreTitle.value.includes(item) && search === false)
        genreTitle.value.push('мюзикл');
      else if (!genreTitleSearh.value.includes(item) && search === true)
        genreTitleSearh.value.push('мюзикл');
      break;
    case 'crime':
      if (!genreTitle.value.includes(item) && search === false)
        genreTitle.value.push('детектив');
      else if (!genreTitleSearh.value.includes(item) && search === true)
        genreTitleSearh.value.push('детектив');
      break;
    case 'tv-movie':
      if (!genreTitle.value.includes(item) && search === false)
        genreTitle.value.push('телевизионные');
      else if (!genreTitleSearh.value.includes(item) && search === true)
        genreTitleSearh.value.push('телевизионные');
      break;
    case 'documentary':
      if (!genreTitle.value.includes(item) && search === false)
        genreTitle.value.push('документальные');
      else if (!genreTitleSearh.value.includes(item) && search === true)
        genreTitleSearh.value.push('документальные');
      break;
    case 'action':
      if (!genreTitle.value.includes(item) && search === false)
        genreTitle.value.push('динамические');
      else if (!genreTitleSearh.value.includes(item) && search === true)
        genreTitleSearh.value.push('динамические');
      break;
    case 'thriller':
      if (!genreTitle.value.includes(item) && search === false)
        genreTitle.value.push('триллер');
      else if (!genreTitleSearh.value.includes(item) && search === true)
        genreTitleSearh.value.push('триллер');
      break;
    case 'western':
      if (!genreTitle.value.includes(item) && search === false)
        genreTitle.value.push('вестерн');
      else if (!genreTitleSearh.value.includes(item) && search === true)
        genreTitleSearh.value.push('вестерн');
      break;
    case 'animation':
      if (!genreTitle.value.includes(item) && search === false)
        genreTitle.value.push('анимационные');
      else if (!genreTitleSearh.value.includes(item) && search === true)
        genreTitleSearh.value.push('анимационные');
      break;
    case 'war':
      if (!genreTitle.value.includes(item) && search === false)
        genreTitle.value.push('военные');
      else if (!genreTitleSearh.value.includes(item) && search === true)
        genreTitleSearh.value.push('военные');
      break;
    case 'adventure':
      if (!genreTitle.value.includes(item) && search === false)
        genreTitle.value.push('приключения');
      else if (!genreTitleSearh.value.includes(item) && search === true)
        genreTitleSearh.value.push('приключения');
      break;
  }
}
export const getGenreTitle = () => {
  return genreTitle.value.join(', ');
}

