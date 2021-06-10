const requests = {
    fetchJoueur: `/joueur`,
    fetchProvince: `/commune/province/:id`,
    fetchCategorie: `/categorie`,
    fetchNiveauByCategorie: `/niveau/categorie/:id`,
    fetchNiveau: `/niveau`,
    fetchSexe: `/sexe`,
    fetchOption: `/option/categorie/:id`,
}

export default requests;