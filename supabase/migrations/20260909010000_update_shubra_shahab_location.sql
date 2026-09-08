-- Clean up location display name for Shubra Shahab Industrial Wastewater Treatment
-- Strips verbose 'Governorate' suffix to prevent text truncation on cards and maps
UPDATE public.locations
SET display_name = 'Shubra Shahab, Qalyubia'
WHERE display_name ILIKE '%Shubra Shahab%';
