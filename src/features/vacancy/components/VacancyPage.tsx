import { useEffect, useState } from "react";
import { useVacancySlice } from "../hooks/useVacancy";
import VacancyCard from "./VacancyCard";
import Loader from "../../../components/ui/loader/Loader";
import { ContentCard } from "../../../components/ui/cards/ContentCard";
import { Vacancy } from "../service/type";
import { VacancyActionModal } from "./VacancyActionModal";
import VacancyDetailModal from "./VacancyDetailModal";
import ActionButton from "../../../components/ui/buttons/ActionButton";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useUserSlice } from "../../authorization/hooks/useUser";

const VacancyPage = () => {
  const { vacancies, loading, getVacancies, addVacancy, editVacancy } =
    useVacancySlice();
  const { user } = useUserSlice();

  useEffect(() => {
    getVacancies();
  }, []);

  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);

  const handleActionModal = (vacancy?: Vacancy) => {
    if (vacancy) {
      setEditingVacancy(vacancy);
    } else {
      setEditingVacancy(null);
    }
    setActionModalOpen(!actionModalOpen);
  };

  const handleDetailModal = (vacancy?: Vacancy) => {
    if (vacancy) {
      setSelectedVacancy(vacancy);
      setDetailModalOpen(true);
    } else {
      setDetailModalOpen(!detailModalOpen);
    }
  };

  const handleSubmitVacancy = async (data: Vacancy): Promise<void> => {
    try {
      if (!user || !user.id) {
        console.error("User not authenticated");
        return;
      }

      const vacancyWithUserId = {
        ...data,
        userId: user.id,
      };

      if (editingVacancy) {
        console.log("Editing vacancy:", editingVacancy);
        await editVacancy({ ...vacancyWithUserId, id: editingVacancy.id });
      } else {
        await addVacancy(vacancyWithUserId);
      }
      handleActionModal();
      getVacancies();
    } catch (error) {
      console.error("Error saving vacancy:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader loading={loading} />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-100">
                Vacancies
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Browse all available job positions
              </p>
            </div>
            <ActionButton onClick={() => handleActionModal()}>
              <PlusIcon className="h-5 w-5" />
              <span>Add Vacancy</span>
            </ActionButton>
          </div>

          {vacancies.length === 0 ? (
            <ContentCard className="bg-blue-50 border border-blue-200">
              <div className="text-blue-600 font-medium text-center p-6">
                No vacancies found. Check back later for new opportunities.
              </div>
            </ContentCard>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vacancies.map((vacancy: Vacancy) => (
                <VacancyCard
                  key={vacancy.id}
                  vacancy={vacancy}
                  onClick={() => handleDetailModal(vacancy)}
                />
              ))}
            </div>
          )}
        </>
      )}
      <VacancyActionModal
        open={actionModalOpen}
        handler={() => handleActionModal()}
        modalType={editingVacancy ? "edit" : "create"}
        activeVacancy={editingVacancy}
        onSubmit={handleSubmitVacancy}
      />

      {selectedVacancy && (
        <VacancyDetailModal
          open={detailModalOpen}
          handler={() => handleDetailModal()}
          vacancy={selectedVacancy}
          onEdit={handleActionModal}
        />
      )}
    </div>
  );
};

export default VacancyPage;
