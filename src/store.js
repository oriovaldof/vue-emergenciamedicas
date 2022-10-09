import Vuex from 'vuex';

export default new Vuex.Store({
    state: {
        titulo: 'Emergencia Médicas',
        equipe: {
            enfermeiro: '',
            socorrista: '',
            medico: '',
            carro: '',
            telefone: '',
            kitDeReanimacao: '',
        },
        enfermeiros: [],
        socorristas: [],
        medicos: [],
        equipamentos: {
            carros: [],
            telefones: [],
            kitsDeReanimacao: []
        }
    },
    getters: {
        totalEnfermeiros(state) {
            return state.enfermeiros.length;
        },
        socorristasPorTurno(state) {
            return (turno) => !turno ? state.socorristas : state.socorristas.filter(item => item.turno === turno);
        },
        totalSocorristas: state => state.socorristas.length,
        totalSocorristasPorTurno: (state, getters) => turno => getters.socorristasPorTurno(turno).length
    },
    mutations: {
        setItemEquipe(state, payload) {
            // console.log(state);
            // console.log(payload);
            let item = payload.item;
            let tipo = item.tipo;
            let dados = item.dados;
            // let tipo = payload.tipo;
            // let dados = payload.dados;

            if (tipo == 'enfermeiros') state.equipe.enfermeiro = dados.nome;
            if (tipo == 'socorristas') state.equipe.socorrista = dados.nome;
            if (tipo == 'medicos') state.equipe.medico = dados.nome;
            if (tipo == 'carros') state.equipe.carro = dados.placa;
            if (tipo == 'telefones') state.equipe.telefone = dados.telefone;
            if (tipo == 'kits-de-reanimacao') state.equipe.kitDeReanimacao = dados.kit;
        },
        setEnfermeiros(state, payload) {
            state.enfermeiros = payload;
        },
        setSocorristas(state, payload) {
            state.socorristas = payload;
        },
        setMedicos(state, payload) {
            state.medicos = payload;
        },
        setCarros(state, payload) {
            state.equipamentos.carros = payload;
        },
        setTelefones(state, { telefones }) {
            state.equipamentos.telefones = telefones;
        },
        setKitsDeReanimacao(state, { kitsDeReanimacao }) {
            state.equipamentos.kitsDeReanimacao = kitsDeReanimacao;
        }
    },
    actions: {
        adicionarEquipamentos(context, {carros,telefones,kitsDeReanimacao}) {
            // console.log(payload);
            context.commit('setCarros',carros);
            //processamento assincrono
            context.commit('setTelefones',{telefones});
            //processamento assincrono
            //diversas regras de negocio
            context.commit('setKitsDeReanimacao',{kitsDeReanimacao});

        }
    }
});