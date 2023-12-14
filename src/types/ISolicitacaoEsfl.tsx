export default interface ISolicitacaoEsfl {
    id?: number,
    mci: number,
    dataSolicitacao?: Date,
    limiteProposto: number,
    subLimiteRotativo: number,
    subLimiteInvestimento: number,
    subLimiteRecebiveis: number,
    parecerAgencia?: string
}