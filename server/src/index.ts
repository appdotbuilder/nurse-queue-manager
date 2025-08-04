
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';

// Import schemas
import { 
  createPatientInputSchema, 
  updatePatientInputSchema, 
  deletePatientInputSchema, 
  markPatientSeenInputSchema 
} from './schema';

// Import handlers
import { createPatient } from './handlers/create_patient';
import { getPatients } from './handlers/get_patients';
import { updatePatient } from './handlers/update_patient';
import { deletePatient } from './handlers/delete_patient';
import { markPatientSeen } from './handlers/mark_patient_seen';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),
  
  // Create a new patient and add to queue
  createPatient: publicProcedure
    .input(createPatientInputSchema)
    .mutation(({ input }) => createPatient(input)),
  
  // Get all patients in queue order
  getPatients: publicProcedure
    .query(() => getPatients()),
  
  // Update patient details
  updatePatient: publicProcedure
    .input(updatePatientInputSchema)
    .mutation(({ input }) => updatePatient(input)),
  
  // Remove patient from queue
  deletePatient: publicProcedure
    .input(deletePatientInputSchema)
    .mutation(({ input }) => deletePatient(input)),
  
  // Mark patient as seen/completed
  markPatientSeen: publicProcedure
    .input(markPatientSeenInputSchema)
    .mutation(({ input }) => markPatientSeen(input)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();
