import { useEffect, useState, useMemo, ComponentProps } from "react";
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
import { SearchInput } from "../../../components/form/SearchInput";
import { Checkbox, Typography } from "@material-tailwind/react";
import { materialProps } from "../../../components/ui/helpers/materialTailwind";

const VacancyPage = () => {
  const { vacancies, loading, getVacancies, addVacancy, editVacancy } =
    useVacancySlice();
  const { user } = useUserSlice();

  useEffect(() => {
    getVacancies();
  }, [getVacancies]);

  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMyVacancies, setShowMyVacancies] = useState(false);

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

  const filteredVacancies = useMemo(() => {
    return vacancies
      .filter((vacancy) => {
        if (!showMyVacancies) return true;
        return vacancy.userId === user?.id;
      })
      .filter((vacancy) => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return (
          vacancy.title.toLowerCase().includes(searchLower) ||
          vacancy.description.toLowerCase().includes(searchLower)
        );
      });
  }, [vacancies, searchTerm, showMyVacancies, user?.id]);

  return (
    <div className="container mx-auto p-1">
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader loading={loading} />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Vacancies
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Browse all available job positions
              </p>
            </div>
            <div className="flex items-center gap-4 flex-grow justify-end">
              <div className="w-72">
                <SearchInput
                  search={searchTerm}
                  onSearchChange={setSearchTerm}
                />
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="my-vacancies"
                  checked={showMyVacancies}
                  onChange={(e) => setShowMyVacancies(e.target.checked)}
                  color="blue"
                  {...materialProps<ComponentProps<typeof Checkbox>>()}
                />
                <Typography
                  variant="small"
                  color="gray"
                  htmlFor="my-vacancies"
                  className="font-normal cursor-pointer select-none dark:text-gray-300"
                >
                  Only my vacancies
                </Typography>
              </div>
              <ActionButton onClick={() => handleActionModal()}>
                <PlusIcon className="h-5 w-5" />
                <span>Add Vacancy</span>
              </ActionButton>
            </div>
          </div>

          {filteredVacancies.length === 0 ? (
            <ContentCard className="bg-blue-50 border border-blue-200">
              <div className="text-blue-600 font-medium text-center p-6">
                No vacancies found matching your criteria.
              </div>
            </ContentCard>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto w-full">
              {filteredVacancies.map((vacancy: Vacancy) => (
                <div key={vacancy.id} className="w-full h-full">
                  <div className="h-full">
                    <VacancyCard
                      vacancy={vacancy}
                      onClick={() => handleDetailModal(vacancy)}
                    />
                  </div>
                </div>
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
