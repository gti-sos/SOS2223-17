<script>
  //@ts-nocheck
  import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Row,
    Col,
    Alert,
    Table,
  } from "sveltestrap";
  import { dev } from "$app/environment";

  let API = "/api/v2/emergency-call-stats";
  let dataCalls = [];

  let flag = false;
  let message = "";
  let color = "";

  let result = "";
  let resultStatus = "";
  let query = {};
 
  if (dev) 
    API = 'https://sos2223-17.appspot.com' + API;
  

  async function searching() {
    //document es un objeto que representa el formulario en el html actual//queryselector es para obtener los valores del formulario
    const province = document.querySelector("#province").value;
    const month = document.querySelector("#month").value;
    const year = document.querySelector("#year").value;
    const from = document.querySelector("#from").value;
    const to = document.querySelector("#to").value;
    const minTelephoneActivations = document.querySelector(
      "#min-telephone-activations"
    ).value;
    const minTechnologicalActivations = document.querySelector(
      "#min-technological-activations"
    ).value;
    const minTotalCalls = document.querySelector("#min-total-calls").value;

   

    if (province !== "") {
      query.province = province;
    }

    if (month !== "") {
      query.month = month;
    }

    if (year !== "") {
      query.year = year;
    }

    if (minTelephoneActivations !== "") {
      query.phone_call_activation_organization = minTelephoneActivations;
    }

    if (minTechnologicalActivations !== "") {
      query.telematic_activation_organization=minTechnologicalActivations;
    }

    if (minTotalCalls !== "") {
      query.emergency_call=minTotalCalls;
    }
    if (from !== "") {
      query.from=from;
    }
    if (to !== "") {
      query.to = to;
    }

   

    resultStatus = result = "";
    const res = await fetch(API + `?${new URLSearchParams(query).toString()}`, {
        method: "GET",
        });
    try {
      const data = await res.json();
      result = JSON.stringify(data, null, 2);
      dataCalls = data;
    } catch (error) {
      console.log(`Error parsing result: ${error}`);
    }

    const status = await res.status;
    resultStatus = status;
    if (status == 200) {
      flag = true;
      color = "success";
      message = `Numero de resultados de la busqueda: ${dataCalls.length}`;
    }
  }

  async function deleteCall(province, month) {
    resultStatus = result = "";
    const res = await fetch(API + "/" + province + "/" + month, {
      method: "DELETE",
    });

    const status = await res.status;
    resultStatus = status;
    if (status == 200) {
      flag = true;
      color = "success";
      message = "Entrada borrada con exito";
      searching();
    }
  }
</script>

<body>
  <Form on:submit={searching}>
    <Row>
      <Col sm="4">
        <FormGroup>
          <Label for="province">Provincia:</Label>
          <Input type="select" id="province" name="province">
            <option value="Almería">Almería</option>
            <option value="Cádiz">Cadiz</option>
            <option value="Córdoba">Córdoba</option>
            <option value="Granada">Granada</option>
            <option value="Huelva">Huelva</option>
            <option value="Jaén">Jaén</option>
            <option value="Málaga">Málaga</option>
            <option value="Sevilla">Sevilla</option>
          </Input>
        </FormGroup>
      </Col>

      <Col sm="4">
        <FormGroup>
          <Label for="month">Mes:</Label>
          <Input type="select" id="month" name="month">
            <option value="january">enero</option>
            <option value="february">febrero</option>
            <option value="march">marzo</option>
            <option value="april">abril</option>
            <option value="may">mayo</option>
            <option value="june">junio</option>
            <option value="july">julio</option>
            <option value="august">agosto</option>
            <option value="september">septiembre</option>
            <option value="october">octubre</option>
            <option value="november">noviembre</option>
            <option value="december">diciembre</option>
            <!-- agregar todos los meses disponibles -->
          </Input>
        </FormGroup>
      </Col>

      <Col sm="4">
        <FormGroup>
          <Label for="year">Año:</Label>
          <Input type="number" id="year" name="year" placeholder="Ej: 2023" />
        </FormGroup>
      </Col>
    </Row>

    <Row>
      <Col sm="4">
        <FormGroup>
          <Label for="from">Desde:</Label>
          <Input type="number" id="from" name="from" placeholder="Ej: 2010" />
        </FormGroup>
      </Col>

      <Col sm="4">
        <FormGroup>
          <Label for="to">Hasta:</Label>
          <Input type="number" id="to" name="to" placeholder="Ej: 2022" />
        </FormGroup>
      </Col>
    </Row>

    <Row>
      <Col sm="4">
        <FormGroup>
          <Label for="min-telephone-activations"
            >Activaciones telefónicas mínimas:</Label
          >
          <Input
            type="number"
            id="min-telephone-activations"
            name="min-telephone- activations"
            placeholder="Ej: 300"
          />
        </FormGroup>
      </Col>

      <Col sm="4">
        <FormGroup>
          <Label for="min-technological-activations"
            >Activaciones telemáticas mínimas:</Label
          >
          <Input
            type="number"
            id="min-technological-activations"
            name="min-technological-activations"
            placeholder="Ej: 300"
          />
        </FormGroup>
      </Col>

      <Col sm="4">
        <FormGroup>
          <Label for="min-total-calls">Número total de llamadas mínimas:</Label>
          <Input
            type="number"
            id="min-total-calls"
            name="min-total-calls"
            placeholder="Ej: 100"
          />
        </FormGroup>
      </Col>
    </Row>
    <Button color="primary" on:click={searching}>Buscar</Button>
  </Form>

  <Alert {color} isOpen={flag} toggle={() => (flag = false)}>
    {#if message != ""}
      {message}
    {/if}
  </Alert>
  <sub>(*) Elementos identificativos únicos</sub>
  <Table hover>
    <colgroup>
      <col span="2" />
      <col span="1" />
    </colgroup>
    <thead>
      <tr>
        <th rowspan="2">Provincia*</th>
        <th rowspan="2">Mes*</th>
        <th colspan="2" id="col">Num. de activaciones a organizaciones </th>
        <th rowspan="2">Número de llamadas</th>
        <th rowspan="2">Año</th>
        <th rowspan="2">Accion</th>
      </tr>
      <tr>
        <th id="activacion-telefonica">Vía telefónica</th>
        <th id="activacion-telematica">Vía telemática</th>
      </tr>
    </thead>
    <tbody>
      {#each dataCalls as call}
        <tr>
          <td>{call.province}</td>
          <td>{call.month}</td>
          <td headers="activacion-telefonica"
            >{call.phone_call_activation_organization}</td
          >
          <td headers="activacion-telematica"
            >{call.telematic_activation_organization}</td
          >
          <td>{call.emergency_call}</td>
          <td>{call.year}</td>
          <td
            ><a href="/emergency-call-stats/{call.province}/{call.month}"
              ><Button color="info">Editar</Button></a
            >
            <Button
              color="danger"
              on:click={deleteCall(call.province, call.month)}>Borrar</Button
            ></td
          >
        </tr>
      {/each}
    </tbody>
  </Table>
  <style>
    td Button {
      width: 70px;
    }
    Table {
      border-collapse: collapse;
      font-family: Arial, sans-serif;
      font-size: 14px;
      text-align: left;
      margin: 5px;
      margin: 0 10px;
    }

    thead tr,
    thead th {
      border: 2px solid #ddd;
      background-color: #f2f2f2;
      font-weight: bold;
    }
    tbody td input {
      width: 110px;
    }
    tbody tr,
    tbody td {
      padding: 5px;
      border: 1px solid #ddd;
      font-weight: grey;
    }

    #col {
      text-align: center;
    }
  </style>
</body>
