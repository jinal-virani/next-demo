import React, { useState } from "react";
import moment from "moment";
import {
  Flex,
  Text,
  Box,
  Button,
  Heading,
  Link,
  Checkbox,
} from "@chakra-ui/react";
import { Table } from "react-chakra-pagination";
import { EditIcon, DeleteIcon, CopyIcon } from "@chakra-ui/icons";

import rows from "./MOCK_DATA.json";

// define type in user
type User = {
  id: number;
  title: string;
  date: string;
  link: string;
};

const users: User[] = rows;

export default function Home() {
  const [page, setPage] = useState(1);
  const [checkedItems, setCheckedItems] = useState(users.map(() => false));

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  // table row  list
  const tableData = users.map((user) => ({
    id: (
      <Checkbox
        size="sm"
        colorScheme="blue"
        isChecked={checkedItems[user?.id]}
        onChange={(e) =>
          setCheckedItems([
            ...checkedItems.slice(0, user?.id),
            e.target.checked,
            ...checkedItems.slice(user?.id + 1),
          ])
        }
      ></Checkbox>
    ),
    title: (
      <Flex align="center">
        <Text>{user.title}</Text>
      </Flex>
    ),
    date: moment(user.date).format("YYYY-MM-DD"),
    link: (
      <Text w={"100px"} noOfLines={1} wordBreak="break-all">
        <Link href={user.link} isExternal>
          {user.link}
        </Link>
      </Text>
    ),
    action: (
      <>
        <Button
          colorScheme="gray"
          onClick={() => alert(`${"Select edit user id"} ${user?.id}`)}
          size="sm"
        >
          <EditIcon />
        </Button>
        <Button
          colorScheme="gray"
          onClick={() => alert(`${"Select remove user id"} ${user?.id}`)}
          size="sm"
          marginLeft={"10px"}
        >
          <DeleteIcon />
        </Button>
        <Button
          colorScheme="gray"
          onClick={() => alert(`${"Select copy user id"} ${user?.id}`)}
          size="sm"
          marginLeft={"10px"}
        >
          <CopyIcon />
        </Button>
      </>
    ),
  }));

  // table Columns  list
  const tableColumns = [
    {
      Header: (
        <Checkbox
          isChecked={allChecked}
          isIndeterminate={isIndeterminate}
          onChange={(e) => setCheckedItems(users.map(() => e.target.checked))}
        />
      ),
      accessor: "id" as const,
    },
    {
      Header: "Title",
      accessor: "title" as const,
    },
    {
      Header: "Date",
      accessor: "date" as const,
    },
    {
      Header: "Link",
      accessor: "link" as const,
    },
    {
      Header: "",
      accessor: "action" as const,
    },
  ];

  return (
    <Box p="12">
      <Heading size="sm" as="h3">
        List of Data
      </Heading>

      <Box mt="6">
        <Table
          colorScheme="blue"
          emptyData={{
            text: "Nobody is registered here.",
          }}
          totalRegisters={+users?.length}
          page={page}
          onPageChange={(page: number) => setPage(page)}
          columns={tableColumns}
          data={tableData}
        />
      </Box>
    </Box>
  );
}
