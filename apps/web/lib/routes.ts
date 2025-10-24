export const routes = {
    home: (queries?:string)=>`/${queries?`?${queries}`:``}`,
    moviesDetail: (id:string)=>`/movies/${id}`
}