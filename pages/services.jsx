import { useFetch } from "@/hooks/useFetch";
import api from "@/lib/axiosInstance";
import { useState } from "react";
import {
  Container,
  Title,
  PageSubtitle,
  Form,
  Input,
  Textarea,
  Button,
  Table,
  Th,
  Td,
  StyledTbody,
  ActionButton,
  StatusBadge,
  Empty,
  DurationWrapper,
  DurationTooltip,
} from "@/styles/services.styles";
import {
  faFileSignature,
  faBusinessTime,
  faMoneyBillWave,
  faPen,
  faEye,
  faEyeSlash,
  faFileLines,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { formatDuration } from "@/utils/time";
import Pagination from "@/components/pagination";
import { Notification } from "@/components/notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SERVICES_PER_PAGE = 10;

const normalizeService = (service) => ({
  ...service,
  duration: Number(service.duration),
  price: Number(service.price),
});

export default function ServicesPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: fetchResult, refetch: fetchServices } = useFetch(
    () => api.get("/services/admin", { params: { page: currentPage, limit: SERVICES_PER_PAGE } })
      .then((r) => ({
        services: (r.data.data || []).map(normalizeService),
        pagination: r.data.pagination || { totalPages: 1 },
      })),
    { deps: [currentPage], errorMessage: "No se pudieron cargar los servicios", initialData: { services: [], pagination: { totalPages: 1 } } }
  );

  const services = fetchResult.services;
  const pagination = fetchResult.pagination;

  const [editingService, setEditingService] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [togglingId, setTogglingId] = useState(null);

  const resetForm = () => {
    setEditingService(null);
    setName("");
    setDescription("");
    setDuration("");
    setPrice("");
  };

  const submitService = async (e) => {
    e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);
    try {
      const payload = {
        name,
        description,
        duration: Number(duration),
        price: Number(price),
      };
      if (editingService) {
        await api.put(`/services/${editingService.id}`, {
          ...payload,
          is_active: editingService.is_active,
        });
        Notification.success("Servicio actualizado");
      } else {
        await api.post("/services", payload);
        Notification.success("Servicio creado");
      }
      resetForm();
      fetchServices();
    } catch (err) {
      Notification.error(err.response?.data?.message || "Error al guardar el servicio");
    } finally {
      setIsSaving(false);
    }
  };

  const editService = (service) => {
    if (!service.is_active) {
      Notification.info("No puedes editar un servicio inactivo");
      return;
    }
    setEditingService(service);
    setName(service.name);
    setDescription(service.description || "");
    setDuration(service.duration);
    setPrice(service.price);
  };

  const toggleService = async (service) => {
    if (togglingId) return;
    setTogglingId(service.id);
    try {
      if (service.is_active) {
        await api.delete(`/services/${service.id}`);
        Notification.warning("Servicio desactivado");
      } else {
        await api.put(`/services/${service.id}`, {
          name: service.name,
          description: service.description,
          duration: Number(service.duration),
          price: Number(service.price),
          is_active: true,
        });
        Notification.success("Servicio reactivado");
      }
      fetchServices();
    } catch (err) {
      Notification.error(err.response?.data?.message || "No se pudo cambiar el estado del servicio");
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <Container>
      <Title>Servicios</Title>
      <PageSubtitle>Crea, edita y activa o desactiva los servicios disponibles para reservas.</PageSubtitle>

      <Form onSubmit={submitService}>
        <Input
          placeholder="Nombre del servicio"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Textarea
          placeholder="Descripción (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <DurationWrapper>
          <Input
            type="number"
            placeholder="Duración (min)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            step="15"
            min="15"
            required
          />
          <DurationTooltip visible={duration}>
            {formatDuration(duration)}
          </DurationTooltip>
        </DurationWrapper>
        <Input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="1"
          required
        />
        <Button type="submit" disabled={isSaving}>
          {isSaving
            ? "Procesando..."
            : editingService
            ? "Actualizar servicio"
            : "Crear servicio"}
        </Button>
        {editingService && (
          <ActionButton onClick={resetForm} disabled={isSaving}>
            Cancelar
          </ActionButton>
        )}
      </Form>

      {services.length === 0 && <Empty>No hay servicios</Empty>}

      {services.length > 0 && (
        <>
          <Table>
            <thead>
              <tr>
                <Th><FontAwesomeIcon icon={faFileSignature} /> Nombre</Th>
                <Th><FontAwesomeIcon icon={faFileLines} /> Descripción</Th>
                <Th><FontAwesomeIcon icon={faBusinessTime} /> Duración</Th>
                <Th><FontAwesomeIcon icon={faMoneyBillWave} /> Precio</Th>
                <Th><FontAwesomeIcon icon={faSliders} /> Estado</Th>
                <Th>Acciones</Th>
              </tr>
            </thead>
            <StyledTbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <Td data-label="Nombre" inactive={!service.is_active}>{service.name}</Td>
                  <Td data-label="Descripción" inactive={!service.is_active} title={service.description}>
                    {service.description || "-"}
                  </Td>
                  <Td data-label="Duración" inactive={!service.is_active}>{formatDuration(service.duration)}</Td>
                  <Td data-label="Precio" inactive={!service.is_active}>${service.price.toFixed(2)}</Td>
                  <Td data-label="Estado">
                    <StatusBadge active={service.is_active}>
                      {service.is_active ? "Activo" : "Inactivo"}
                    </StatusBadge>
                  </Td>
                  <Td data-label="Acciones">
                    <ActionButton
                      variant="edit"
                      disabled={!service.is_active || isSaving}
                      onClick={() => editService(service)}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </ActionButton>
                    <ActionButton
                      variant={service.is_active ? "danger" : "default"}
                      disabled={togglingId === service.id}
                      onClick={() => toggleService(service)}
                    >
                      <FontAwesomeIcon icon={service.is_active ? faEyeSlash : faEye} />
                    </ActionButton>
                  </Td>
                </tr>
              ))}
            </StyledTbody>
          </Table>

          <Pagination
            totalPages={pagination.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </Container>
  );
}