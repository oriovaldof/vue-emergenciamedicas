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
        setTelefones(state, payload) {
            state.equipamentos.telefones = payload;
        },
        setKitsDeReanimacao(state, payload) {
            state.equipamentos.kitsDeReanimacao = payload;
        }
    },
    actions: {
        fetchEquipamentos(context, { carros, telefones, kitsDeReanimacao }) {
           
            fetch("http://localhost:3001/equipamentos")
                .then((response) => response.json())
                .then((dados) => {
                    // console.log(payload);
                    if (carros) context.commit('setCarros', dados.carros);
                    //processamento assincrono
                    if (telefones) context.commit('setTelefones', dados.telefones);
                    //processamento assincrono
                    //diversas regras de negocio
                    if (kitsDeReanimacao) context.commit('setKitsDeReanimacao', dados.kitsDeReanimacao);

                });

        },
        fetchProfissionais(context) {
            fetch("http://localhost:3001/enfermeiros")
                .then((response) => response.json())
                .then((dados) => context.commit('setEnfermeiros', dados));

            fetch("http://localhost:3001/socorristas")
                .then((response) => response.json())
                .then((dados) => context.commit('setSocorristas', dados));

            fetch("http://localhost:3001/medicos")
                .then((response) => response.json())
                .then((dados) => context.commit('setMedicos', dados));

        }
    }
});