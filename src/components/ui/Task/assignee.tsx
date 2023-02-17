import { Button, Kbd, Menu, Text, TextInput, Avatar, Skeleton, Tooltip } from "@mantine/core";
import { Member } from "modules/app/datatypes";

import { useData } from "lib/useData";

export const AssigneePhoto = (member: Member | undefined) => {
  return member?.photoUrl ? (
    <Avatar src={member.photoUrl} size="sm" radius="xl" />
  ) : (
    <Avatar size="sm" radius="xl" />
  );
};

export const AssigneeName = (member: Member | undefined) => {
  return member ? member?.name : "Assignee";
};

type GenericMembersMenuProps = {
  children: React.ReactNode;
  onSelect?: (member: Member | undefined) => void;
};

export const GenericAssigneeMenu = ({ children, onSelect }: GenericMembersMenuProps) => {
  const { membersData, isLoadingMembers } = useData();

  return (
    <Menu shadow="md" width={180}>
      <Tooltip label="Assign to" position="bottom">
        {children}
      </Tooltip>

      <Menu.Dropdown>
        <TextInput
          placeholder="Assign to..."
          variant="filled"
          rightSection={<Kbd px={8}>A</Kbd>}
        ></TextInput>
        <Menu.Divider />
        <Menu.Item
          icon={<Avatar size="sm" radius="xl" />}
          onClick={() => onSelect && onSelect(undefined)}
        >
          Unassigned
        </Menu.Item>
        {isLoadingMembers ? (
          <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
        ) : (
          membersData?.members.map(m => {
            return (
              <Menu.Item
                key={m.id}
                icon={
                  m?.photoUrl ? (
                    <Avatar src={m.photoUrl} size="sm" radius="xl" />
                  ) : (
                    <Avatar size="sm" radius="xl" />
                  )
                }
                onClick={() => onSelect && onSelect(m)}
              >
                {m.name}
              </Menu.Item>
            );
          })
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

type AssigneeSelectorProps = {
  assignee: Member | undefined;
  setAssignee: (assignee: Member | undefined) => void;
};

export const AssigneeSelector = ({ assignee, setAssignee }: AssigneeSelectorProps) => {
  return (
    <GenericAssigneeMenu onSelect={member => setAssignee(member)}>
      {typeof assignee === "undefined" ? (
        <Button compact variant="light" color={"gray"}>
          {AssigneePhoto(assignee)}
        </Button>
      ) : (
        <Button compact variant="light" color={"gray"} leftIcon={AssigneePhoto(assignee)}>
          <Text size={"xs"}>{AssigneeName(assignee)}</Text>
        </Button>
      )}
    </GenericAssigneeMenu>
  );
};
