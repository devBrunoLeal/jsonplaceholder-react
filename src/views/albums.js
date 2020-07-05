import React from 'react';


export default class albums extends React.Component {

    state = {
        albums: [],
        carregando: true,
        click: 0
    }


    // Estebele a conexão com a Api e injeta os dados no state
    componentDidMount = async () => {
        const url = "https://jsonplaceholder.typicode.com/albums";
        const response = await fetch(url)
        const data = await response.json();
        this.setState({ albums: data, carregando: false })
        console.log(this.state.albums)
    }

    // Indentifica as mudanças no input de pesquisa para mudar o state.
    onChange = (number) => {
        this.setState({
            number: number.target.value

        })
        console.log(this.state.number)
    }

    // Estabele com uma conexão com a Api com o filtro por id, logo após injeta a resposta no state de albums.
    PesquisarAlbum = async () => {

        const url = `https://jsonplaceholder.typicode.com/albums?id=${this.state.number}`;
        const response = await fetch(url)
        const data = await response.json();
        if (data == "")
            return alert('ID não existente')
        this.setState({ albums: data, carregando: false, click: 0 })

        console.log(data)

    }
    // Estabele o state click, quando recebe o valor 1 existe uma conficional na renderização da página para mudar ordenação.
    reverterOrdenacao = () => {
        if (this.state.click == 0 && this.state.albums.length > 0) {
            this.setState({
                click: 1
            })

        }
        if (this.state.click == 1 && this.state.albums.length > 0) {
            this.setState({
                click: 0
            })

        }

    }

    render() {


        if (this.state.carregando) {
            return <div className="circle">Carregando...</div>
        }


        return (


            <div class="card bg-light mb-3" style={{ width: "1000px" }}>
                <div class="input-group mb-3" style={{ width: "400px", marginRight: "30px" }}>
                    <input name="numberPesquisa" type="number" class="form-control" onChange={this.onChange} placeholder="Pesquisar um ID... Ex: 1" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" onClick={this.PesquisarAlbum} style={{ marginLeft: "5px" }}>Pesquisar</button>
                    </div>
                </div>
                <div class="card-header"><h2 className="cardh2">Albums</h2></div>
                <button onClick={this.reverterOrdenacao} className="button button2"
                    style={{ width: "100px", fontSize: "10px", position: "relative", letterSpacing: "1px", display: "inline-block", padding: "5px" }}>
                    <span class="material-icons" id="reordenar">
                        low_priority
                </span>Reordenar</button>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Título</th>
                            <th scope="col">Imagem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Temos 2 condicionais e mapeamentos.  
                  caso o state click tenha recebido 1, irá renderizar de formar descrescente
                  e vice versa.
                  E o state lenght detecta se deve usar o map ou apenas uma posição do array, para
                  renderizar o resultado da pesquisa. */}

                        {this.state.click == 0 ? (
                            this.state.albums.length >= 0 ?
                                (this.state.albums.map(albums => (

                                    <tr key={albums.id}>
                                        <th scope="row">{albums.id}</th>
                                        <td>{albums.title}</td>
                                        <td colspan="2"><img alt="imagem" src="https://source.unsplash.com/collection/8461418/100x100" /></td>
                                    </tr>))) : (

                                    <tr key={this.state.albums.id}>
                                        <th scope="row">{this.state.albums.id}</th>
                                        <td>{this.state.albums.title}</td>
                                        <td colspan="2"><img alt="imagem" src="https://source.unsplash.com/collection/8461418/100x100" /></td>
                                    </tr>
                                )
                        ) : (
                                /* Usando reverse para mapear em ordem decrescente.*/
                                this.state.albums.reverse().map(albums => (

                                    <tr key={albums.id}>
                                        <th scope="row">{albums.id}</th>
                                        <td>{albums.title}</td>
                                        <td colspan="2"><img alt="imagem" src="https://source.unsplash.com/collection/8461418/100x100" /></td>
                                    </tr>))

                            )

                        }


                    </tbody>
                </table>
                {/* Botão para voltar ao resultado inicial da tabela */}
                <button class="btn btn-outline-secondary" onClick={this.componentDidMount} type="button" style={{ marginLeft: "5px", background: "#333", color: "white" }}>Voltar</button>
            </div>


        )
    }

}