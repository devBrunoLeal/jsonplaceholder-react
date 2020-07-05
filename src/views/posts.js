import React from 'react';

export default class Postagens extends React.Component {

    state = {
        posts: [],
        carregando: true,
        click: 0
    }

    // Estebele a conexão com a Api e injeta os dados no state
    componentDidMount = async () => {
        const url = "https://jsonplaceholder.typicode.com/posts";
        const response = await fetch(url)
        const data = await response.json();
        this.setState({ posts: data, carregando: false })
        console.log(this.state.posts)


    }
    // Indentifica as mudanças no input de pesquisa para mudar o state.
    onChange = (number) => {
        this.setState({
            number: number.target.value,

        })
        console.log(this.state.number)
    }
    // Estabele com uma conexão com a Api com o filtro por id, logo após injeta a resposta no state de posts.
    PesquisarPost = async () => {

        const url = `https://jsonplaceholder.typicode.com/posts?id=${this.state.number}`;
        const response = await fetch(url)
        const data = await response.json();
        if (data == "")
            return alert('ID não existente')
        this.setState({ posts: data, carregando: false, click: 0 })

        console.log(data)

    }
    // Estabele o state click, quando recebe o valor 1 existe uma conficional na renderização da página para mudar ordenação.
    reverterOrdenacao = () => {
        if (this.state.click == 0 && this.state.posts.length > 0) {
            this.setState({
                click: 1
            })

        }
        if (this.state.click == 1 && this.state.posts.length > 0) {
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
                        <button class="btn btn-outline-secondary" type="button" onClick={this.PesquisarPost} style={{ marginLeft: "5px" }}>Pesquisar</button>
                    </div>
                </div>
                <div class="card-header"><h2 className="cardh2">Postagens</h2></div>
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
                            <th scope="col">Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Temos 2 condicionais e mapeamentos.  
                  caso o state click tenha recebido 1, irá renderizar de formar descrescente
                  e vice versa.
                  E o state lenght detecta se deve usar o map ou apenas uma posição do array, para
                  renderizar o resultado da pesquisa. */}

                        {this.state.click == 0 ? (
                            this.state.posts.length >= 0 ? (

                                this.state.posts.map(post => (

                                    <tr key={post.id}>
                                        <th scope="row">{post.id}</th>
                                        <td>{post.title}</td>
                                        <td colspan="2">{post.body}</td>
                                    </tr>))) : (

                                    <tr key={this.state.posts.id}>
                                        <th scope="row">{this.state.posts.id}</th>
                                        <td>{this.state.posts.title}</td>
                                        <td colspan="2">{this.state.posts.body}</td>
                                    </tr>
                                )
                        ) : (
                                this.state.posts.reverse().map(post => (

                                    <tr key={post.id}>
                                        <th scope="row">{post.id}</th>
                                        <td>{post.title}</td>
                                        <td colspan="2">{post.body}</td>
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