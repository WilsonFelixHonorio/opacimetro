const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const SYSCON_BASE_URL = "https://customer.sysconweb.com.br/bb94545f-9d9f-4bb5-bd72-284e4bc5faff";
const API_URL = "https://dev.sysconweb.com.br/api/customerLink/tests?customerLinkId=bb94545f-9d9f-4bb5-bd72-284e4bc5faff";

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface SysconTest {
  id: number;
  uniqueId: string;
  customerVehicleBrand: string;
  customerVehicleModel: string;
  customerVehiclePlate: string;
  testKm: number;
  testType: string;
  testStart: string;
  status: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch the API data
    console.log('Fetching Syscon API...');
    const response = await fetch(API_URL, {
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const tests: SysconTest[] = await response.json();
    console.log(`Fetched ${tests.length} tests from Syscon API`);

    // Update existing laudos with URLs and upsert new ones
    let updated = 0;
    let inserted = 0;
    let errors = 0;

    for (const test of tests) {
      const url = `${SYSCON_BASE_URL}/test-details/${test.uniqueId}`;
      const veiculo = `${test.customerVehicleBrand} / ${test.customerVehicleModel}`;
      const dateStr = test.testStart.split('T')[0];
      const [year, month, day] = dateStr.split('-');
      const dataFormatted = `${day}/${month}/${year}`;

      // Try update first
      const { data: existing, error: selectError } = await supabase
        .from('laudos')
        .select('id')
        .eq('numero', test.id)
        .maybeSingle();

      if (existing) {
        // Update URL
        const { error } = await supabase
          .from('laudos')
          .update({ url })
          .eq('numero', test.id);
        if (error) {
          console.error(`Error updating laudo ${test.id}:`, error.message);
          errors++;
        } else {
          updated++;
        }
      } else {
        // Insert new laudo
        const { error } = await supabase
          .from('laudos')
          .insert({
            numero: test.id,
            url,
            veiculo,
            placa: test.customerVehiclePlate.toUpperCase(),
            km: test.testKm,
            resultado: test.status,
            data: dataFormatted,
            tipo: test.testType,
          });
        if (error) {
          console.error(`Error inserting laudo ${test.id}:`, error.message);
          errors++;
        } else {
          inserted++;
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        totalFromApi: tests.length,
        updated,
        inserted,
        errors,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
