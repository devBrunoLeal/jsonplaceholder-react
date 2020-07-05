import React from 'react';


export default class Todos extends React.Component {

    state = {
        todos: [],
        carregando: true,
        click: 0
    }
    // Estebele a conexão com a Api e injeta os dados no state
    componentDidMount = async () => {
        const url = "https://jsonplaceholder.typicode.com/todos";
        const response = await fetch(url)
        const data = await response.json();
        this.setState({ todos: data, carregando: false })
        console.log(this.state.todos)
    }
    // Recebe um evento para consulta se o To-do foi concluido ou não
    Verificar = (e) => {
        if (e == true) {
            const aux = "Feito!"
            return aux
        }
        else {
            const aux = "Pendente"
            return aux
        }

    }

    onClick = (e) => {
        const verif = e.target.completed
        const nomeDoCampo = e.target.id

        this.setState({
            [nomeDoCampo]: verif
        })
    }
    // Indentifica as mudanças no input de pesquisa para mudar o state.
    onChange = (number) => {
        this.setState({
            number: number.target.value

        })
        console.log(this.state.number)
    }
    // Estabele com uma conexão com a Api com o filtro por id, logo após injeta a resposta no state de To-dos.
    PesquisarTodo = async () => {

        const url = `https://jsonplaceholder.typicode.com/todos?userId=${this.state.number}`;
        const response = await fetch(url)
        const data = await response.json();
        if (data == "")
            return alert('ID não existente! filtrado por ID de usuário.')
        this.setState({ todos: data, carregando: false, click: 0 })



    }
    // Estabele o state click, quando recebe o valor 1 existe uma conficional na renderização da página para mudar ordenação.
    reverterOrdenacao = () => {
        if (this.state.click == 0 && this.state.todos.length > 0) {
            this.setState({
                click: 1
            })

        }
        if (this.state.click == 1 && this.state.todos.length > 0) {
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
                    <input name="numberPesquisa" type="number" class="form-control" onChange={this.onChange} placeholder="Filtro por número de usuário... Ex: 1" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <div class="input-group-append">
                    </div>
                    <button class="btn btn-outline-secondary" type="button" onClick={this.PesquisarTodo} style={{ marginLeft: "5px" }}>Pesquisar</button>
                </div>
                <div class="card-header"><h2 className="cardh2">To-dos</h2></div>
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

                        </tr>
                    </thead>
                    <tbody>
                        {/* Temos 2 condicionais e mapeamentos.  
                  caso o state click tenha recebido 1, irá renderizar de formar descrescente
                  e vice versa.
                  E o state lenght detecta se deve usar o map ou apenas uma posição do array, para
                  renderizar o resultado da pesquisa. */}
                        {this.state.click == 0 ? (
                            this.state.todos.length >= 0 ?
                                (this.state.todos.map(todo => (

                                    <tr key={todo.id}>
                                        <th scope="row">{todo.id}</th>
                                        <td colspan="2">{todo.title}</td>
                                        <td>
                                            <div class="btn-group-toggle" data-toggle="buttons" onClick={this.onClick} >
                                                <label class="btn btn-secondary active">
                                                    <input type="checkbox" checked={todo.completed} autocomplete="off" /> {this.Verificar(todo.completed)}
                                                </label>
                                            </div>
                                        </td>
                                    </tr>))) : (

                                    <tr key={this.state.todos.id}>
                                        <th scope="row">{this.state.todos.id}</th>
                                        <td colspan="2">{this.state.todos.title}</td>
                                        <td>
                                            <div class="btn-group-toggle" data-toggle="buttons" onClick={this.onClick} >
                                                <label class="btn btn-secondary active">
                                                    <input type="checkbox" checked={this.state.todos.completed} autocomplete="off" /> {this.Verificar(this.state.todos.completed)}
                                                </label>
                                            </div>
                                        </td>
                                    </tr>

                                )
                        ) : (
                                /* Usando reverse para mapear em ordem decrescente.*/
                                this.state.todos.reverse().map(todo => (

                                    <tr key={todo.id}>
                                        <th scope="row">{todo.id}</th>
                                        <td colspan="2">{todo.title}</td>
                                        <td>
                                            <div class="btn-group-toggle" data-toggle="buttons" onClick={this.onClick} >
                                                <label class="btn btn-secondary active">
                                                    <input type="checkbox" checked={todo.completed} autocomplete="off" /> {this.Verificar(todo.completed)}
                                                </label>
                                            </div>
                                        </td>
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