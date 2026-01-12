import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import api from "@/lib/axiosInstance";
import {
  Container,
  Title,
  Form,
  Input,
  Textarea,
  Button,
  Table,
  Th,
  Td,
  ActionButton,
  Empty,
  StatusBadge
} from "@/styles/services.styles";
import {
  faEye,
  faEyeSlash,
  faPen,
  faFileSignature,
  faBusinessTime,
  faMoneyBillWave,
  faSliders,
  faAlignLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");

  const fetchServices = async () => {
    const res = await api.get("/services/list");
    setServices(res.data.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const resetForm = () => {
    setEditingService(null);
    setName("");
    setDescription("");
    setDuration("");
    setPrice("");
  };

  const submitService = async (e) => {
    e.preventDefault();

    if (editingService) {
      await api.put(`/services/${editingService.id}`, {
        name,
        description,
        duration,
        price,
        is_active: editingService.is_active,
      });
    } else {
      await api.post("/services", {
        name,
        description,
        duration,
        price,
      });
    }

    resetForm();
    fetchServices();
  };

  const editService = (service) => {
    setEditingService(service);
    setName(service.name);
    setDescription(service.description || "");
    setDuration(service.duration);
    setPrice(service.price);
  };

  const toggleService = async (service) => {
    await api.put(`/services/${service.id}`, {
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price,
      is_active: !service.is_active,
    });

    fetchServices();
  };

  return (
    <Layout>
      <Container>
        <Title>Servicios</Title>

        <Form onSubmit={submitService}>
          <Input
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Duración (min)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />

          <Input
            type="number"
            placeholder="Precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <Button type="submit">
            {editingService ? "Actualizar servicio" : "Crear servicio"}
          </Button>

          {editingService && (
            <ActionButton onClick={resetForm}>Cancelar</ActionButton>
          )}
        </Form>

        {services.length === 0 && (
          <Empty>No hay servicios registrados</Empty>
        )}

        {services.length > 0 && (
          <Table>
            <thead>
              <tr>
                <Th>
                  <FontAwesomeIcon icon={faFileSignature} />Nombre
                </Th>
                <Th>
                  <FontAwesomeIcon icon={faAlignLeft} />Descripción
                </Th>
                <Th>
                  <FontAwesomeIcon icon={faBusinessTime} />Duración
                </Th>
                <Th>
                  <FontAwesomeIcon icon={faMoneyBillWave} />Precio
                </Th>
                <Th>
                  <FontAwesomeIcon icon={faSliders} />Estado
                </Th>
                <Th>Acciones</Th>
              </tr>
            </thead>

            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <Td inactive={!service.is_active}>{service.name}</Td>
                  <Td
                    inactive={!service.is_active}
                    title={service.description}
                  >
                    {service.description || "-"}
                  </Td>
                  <Td inactive={!service.is_active}>
                    {service.duration} min
                  </Td>
                  <Td inactive={!service.is_active}>
                    ${service.price}
                  </Td>
                  <Td>
                    <StatusBadge active={service.is_active}>
                      {service.is_active ? "Activo" : "Inactivo"}
                    </StatusBadge>
                  </Td>
                  <Td>
                    <ActionButton
                      variant="edit"
                      onClick={() => editService(service)}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </ActionButton>

                    <ActionButton
                      variant={service.is_active ? "danger" : "default"}
                      onClick={() => toggleService(service)}
                    >
                      <FontAwesomeIcon
                        icon={service.is_active ? faEyeSlash : faEye}
                      />
                    </ActionButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </Layout>
  );
}