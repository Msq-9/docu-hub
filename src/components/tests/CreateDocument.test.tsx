import CreateDocument from '@components/CreateDocument';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createRichTextDocument } from '@operations/document';
import * as nextRouter from 'next/router';
import userEvent from '@testing-library/user-event';
import { NextRouter } from 'next/router';
import { randomUUID } from 'crypto';

const useRouter = jest.spyOn(nextRouter, 'useRouter');
const router = { push: jest.fn() };
useRouter.mockImplementation(() => router as unknown as NextRouter);

describe('CreateDocument', () => {
  it('renders successfully', () => {
    render(
      <MockedProvider>
        <CreateDocument />
      </MockedProvider>
    );

    expect(
      screen.getByRole('button', { name: new RegExp('Create document') })
    ).toBeInTheDocument();
  });

  it('button click creates new document', async () => {
    const documentId = randomUUID();
    const mocks = [
      {
        request: {
          query: createRichTextDocument,
          variables: { documentInput: { title: 'New Document' } }
        },
        result: {
          data: {
            createDocument: {
              id: documentId,
              title: 'New Document',
              isPublic: false,
              sharedTo: [],
              createdBy: randomUUID(),
              createdAt: '',
              updatedAt: '',
              documentJSON: {}
            }
          }
        }
      }
    ];

    render(
      <MockedProvider mocks={mocks}>
        <CreateDocument />
      </MockedProvider>
    );

    const createDocumentButton = screen.getByRole('button', {
      name: new RegExp('Create document')
    });

    expect(createDocumentButton).toBeInTheDocument();

    await userEvent.click(createDocumentButton);

    expect(router.push).toHaveBeenCalledWith(`/documents/${documentId}`);
  });
});
