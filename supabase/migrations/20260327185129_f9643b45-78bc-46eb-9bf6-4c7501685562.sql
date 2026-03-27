INSERT INTO storage.buckets (id, name, public) VALUES ('site-assets', 'site-assets', true);

CREATE POLICY "Public read access" ON storage.objects FOR SELECT TO public USING (bucket_id = 'site-assets');
CREATE POLICY "Admin upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));