import React, { useEffect, useState } from "react";
import { ContentCard } from "../../../components/ui/cards/ContentCard";
import { useSkillSlice } from "../hooks/useSkill";
import { Skill } from "../services/type";
import { SkillHeader } from "./SkillHeader";
import { SearchInput } from "../../../components/form/SearchInput";
import { SkillModal } from "./SkillModal";
import SkillTable from "./SkillTable";
import Loader from "../../../components/ui/loader/Loader";

const SkillPage: React.FC = () => {
  const { skills, loading, getSkills, addSkill, editSkill, removeSkill } =
    useSkillSlice();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  useEffect(() => {
    getSkills();
  }, []);

  const handleAddClick = () => {
    setModalType("create");
    setActiveSkill(null);
    setModalOpen(true);
  };

  const handleEdit = (skill: Skill) => {
    setModalType("edit");
    setActiveSkill(skill);
    setModalOpen(true);
  };

  const handleSubmit = async (data: Skill) => {
    if (modalType === "create") {
      await addSkill({ ...data, id: "" });
    } else if (modalType === "edit" && activeSkill) {
      await editSkill({ ...activeSkill, ...data });
    }
    setModalOpen(false);
    setActiveSkill(null);
  };
  const onCloseHandler = () => {
    setModalOpen(false);
  };
  const filteredSkills = Array.isArray(skills)
    ? skills.filter((s: Skill) =>
        s.title.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <>
      {loading && <Loader loading={loading} />}
      <div className="min-h-screen">
        <ContentCard className="bg-white dark:bg-[#424242]">
          <SkillHeader onAddClick={handleAddClick} />
          <SearchInput search={search} onSearchChange={setSearch} />
          <SkillTable
            filteredSkills={filteredSkills}
            onEdit={handleEdit}
            onDelete={removeSkill}
          />
          <SkillModal
            open={modalOpen}
            onClose={onCloseHandler}
            modalType={modalType}
            activeSkill={activeSkill}
            onSubmit={handleSubmit}
          />
        </ContentCard>
      </div>
    </>
  );
};

export default SkillPage;
