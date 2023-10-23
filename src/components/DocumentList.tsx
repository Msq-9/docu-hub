import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  deleteRichTextDocument,
  getDocumentById,
  getDocumentList,
  updateRichTextDocument
} from '@operations/document';
import { getAllUsersQuery } from '@operations/user';
import { Document, User } from '@schema/types';
import {
  Spin,
  List,
  Skeleton,
  Modal,
  Select,
  Alert,
  SelectProps,
  Button
} from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useState } from 'react';

const DocumentList = (): JSX.Element => {
  const { data, loading } = useQuery(getDocumentList);
  const [userOptions, setUserOptions] = useState<
    Array<{
      label: string;
      value: string;
    }>
  >([]);
  const [sharedUsers, setSharedUsers] = useState<Array<string>>([]);

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);
  const [currDocId, setCurrDocId] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const { data: listUsers, loading: loadingUsersList } = useQuery(
    getAllUsersQuery,
    {
      onCompleted: (data) => {
        const userList: Array<{ label: string; value: string }> = [];
        data.listUsers?.forEach((user: User) => {
          userList.push({
            label: user.firstname + ' ' + user.lastname,
            value: user.id
          });
        });
        setUserOptions(userList);
      }
    }
  );

  const [getDocument, { loading: loadingDocument, data: documentData }] =
    useLazyQuery(getDocumentById, {
      onCompleted: (data) => {
        setSharedUsers(data.document.sharedTo);
      }
    });

  const [itemToDelete, setItemToDelete] = useState<Document>();

  const [deleteRTDocument, { loading: loadingDeleteDoc }] = useMutation(
    deleteRichTextDocument,
    {
      refetchQueries: [{ query: getDocumentList }],
      onCompleted: () => {
        setIsDeleteConfirmationModalOpen(false);
        setAlertMessage(`Successfully deleted!`);
      }
    }
  );
  const [updateRTDocument, { loading: updatingDocument }] = useMutation(
    updateRichTextDocument,
    {
      onCompleted: (data) => {
        setIsShareModalOpen(false);
        setAlertMessage(`Successfully shared "${data.updateDocument.title}" !`);
      }
    }
  );

  if ((loading && !data) || (loadingUsersList && !listUsers)) {
    return (
      <div className="my-40">
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      </div>
    );
  }

  const documentList = data.documentList.map((doc: Document) => ({
    ...doc,
    updatedAt: new Date(doc.updatedAt || doc.createdAt).toDateString()
  }));

  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option?: DefaultOptionType) => {
    return ((option?.label ?? '') as string)
      .toLowerCase()
      .includes(input.toLowerCase());
  };

  const selectProps: SelectProps = {
    mode: 'multiple',
    style: { width: '100%' },
    value: userOptions.filter((user) => sharedUsers.indexOf(user.value) >= 0),
    options: userOptions,
    filterOption: (input, option) => {
      return filterOption(input, option);
    },
    onChange: (newValue: string[]) => {
      setSharedUsers(newValue);
    },
    placeholder: 'Select Users...',
    maxTagCount: 'responsive'
  };

  return (
    <div className="mx-10 px-10">
      {alertMessage && (
        <Alert type="success" showIcon message={alertMessage} closable />
      )}
      <Modal
        title={`Share "${documentData?.document?.title}" with`}
        open={isShareModalOpen}
        confirmLoading={updatingDocument}
        onOk={async (evt) => {
          evt.preventDefault();
          await updateRTDocument({
            variables: {
              documentInput: { sharedTo: sharedUsers, id: currDocId }
            }
          });
        }}
        onCancel={() => {
          setIsShareModalOpen(false);
        }}
      >
        <Select {...selectProps} />
      </Modal>
      <Modal
        title={`Confirm deleting '${itemToDelete?.title}'`}
        open={isDeleteConfirmationModalOpen}
        confirmLoading={loadingDeleteDoc}
        onOk={async () => {
          await deleteRTDocument({
            variables: { documentId: itemToDelete?.id }
          });
        }}
        onCancel={() => {
          setIsDeleteConfirmationModalOpen(false);
          setItemToDelete(undefined);
        }}
        okText={'Delete'}
      >{`Are you sure you want to delete '${itemToDelete?.title}', this action cannot be un-done!`}</Modal>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={documentList}
        renderItem={(item: Document) => (
          <List.Item
            actions={[
              <Button size="small" type="link" href={`/documents/${item.id}`}>
                edit
              </Button>,
              <Button
                type="link"
                size="small"
                loading={
                  (loadingUsersList || loadingDocument) && item.id == currDocId
                }
                onClick={async () => {
                  setCurrDocId(item.id);
                  await getDocument({
                    variables: {
                      documentId: item.id
                    }
                  });
                  setIsShareModalOpen(true);
                }}
              >
                share
              </Button>,
              <Button
                type="link"
                size="small"
                danger
                onClick={() => {
                  setItemToDelete(item);
                  setIsDeleteConfirmationModalOpen(true);
                }}
              >
                delete
              </Button>
            ]}
          >
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                title={<a href={`/documents/${item.id}`}>{item.title}</a>}
                description={`Last updated on ${item.updatedAt}`}
              />
              <div>{`Created by: ${item.createdBy}`}</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};

export default DocumentList;
